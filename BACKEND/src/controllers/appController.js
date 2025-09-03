const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const sendEmail = require("../utils/sendEmail");
const appSubmitEmailTemplate = require("../utils/emailTemplates/appSubmitEmailTemplate");
const statusUpdateEmailTemplate = require("../utils/emailTemplates/statusUpdateEmailTemplate");
const interviewScheduledEmailTemplate = require("../utils/emailTemplates/interviewScheduledEmailTemplate");
const { createGoogleMeet } = require("../utils/googleMeet");

exports.getApplicationsbyId = async (req, res) => {
  const { jobId } = req.params;

  try {
    const applications = await prisma.application.findMany({
      where: {
        jobId,
      },
      select: {
        resume:true,
        status:true,
        contactInfo:true,
        educations:true,
        personalInfo:true,
        job: true,
        skills:true,
        experiences:true,
        appliedAt:true
      },
      orderBy: {
        appliedAt: "desc",
      },
    });

    res.json(applications);
  } catch (err) {
    console.error("Failed to get applications by job ID", err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

exports.getApplicationsByUser = async (req, res) => {
  //user side
  const { userId } = req.params;

  try {
    const applications = await prisma.application.findMany({
      where: {
        applicantId: userId,
      },
      select: {
        id: true,
        status: true,
        appliedAt: true,
        resume: true,
        skills: true,
        coverLetter: true,
        portfolio: true,
        job: {
          select: {
            id: true,
            title: true,
            companyName: true,
            location: true,
            salaryRange: true,
            jobType: true,
          },
        },
      },
    });

    return res.json(applications);
  } catch (error) {
    console.error("Error fetching user applications:", error);
    return res.status(500).json({ error: "Failed to fetch user applications" });
  }
};

exports.updateApplicationStatus = async (req, res) => {
  const { applicationId } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ error: "Invalid status value" });
  }

  try {
    const updatedApplication = await prisma.application.update({
      where: { id: applicationId },
      data: { status: status },
      include: {
        applicant: { select: { name: true, email: true } },
        job: { select: { title: true } },
      },
    });

    // Email notification
    await sendEmail({
      to: updatedApplication.applicant.email,
      subject: `Update on Your Application for ${updatedApplication.job.title}`,
      html: statusUpdateEmailTemplate({
        fullName: updatedApplication.applicant.name || "Candidate",
        jobTitle: updatedApplication.job.title,
        status,
      }),
    });

    return res.json({
      success: true,
      message: "Status updated and email sent",
    });
  } catch (err) {
    console.error("Error updating status:", err);
    return res.status(500).json({ error: "Failed to update status" });
  }
};

exports.scheduleInterview = async (req, res) => {
  const { applicationId } = req.params;
  const { date, time } = req.body;
  const combinedDateTime = new Date(`${date}T${time}:00+05:30`);

  console.log(req.user);

  if (!date || !time) {
    return res
      .status(400)
      .json({ error: "Interview date and time are required" });
  }

  try {
    const application = await prisma.application.findUnique({
      where: { id: applicationId },
      include: {
        applicant: { select: { name: true, email: true } },
        job: { select: { title: true } },
      },
    });

    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }

    const startTime = new Date(`${date}T${time}`);
    const endTime = new Date(startTime.getTime() + 60 * 60000);
    const attendees = [];
    if (application.applicant.email) {
      attendees.push(application.applicant.email);
    }

    const admin = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: { email: true },
    });

    if (admin?.email) attendees.push(admin.email);
    // console.log(attendees);

    const meetingLink = await createGoogleMeet({
      summary: `Interview for ${application.job.title}`,
      description: `Interview with ${application.applicant.name}`,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      attendees: attendees,
    });

    const updatedApplication = await prisma.application.update({
      where: { id: applicationId },
      data: {
        status: "INTERVIEW_SCHEDULED",
        interviewDate: combinedDateTime,
        interviewTime: time,
        meetingLink,
      },
    });

    await sendEmail({
      to: application.applicant.email,
      subject: `Interview Scheduled for ${application.job.title}`,
      html: interviewScheduledEmailTemplate({
        fullName: application.applicant.name || "Candidate",
        jobTitle: application.job.title,
        interviewDate: date,
        interviewTime: time,
        meetingLink,
      }),
    });

    await sendEmail({
      to: admin.email,
      subject: `Interview Scheduled with ${application.applicant.name}`,
      html: `<p>You have scheduled an interview for <b>${application.job.title}</b> with ${application.applicant.name}.</p>
             <p>Date: ${date}</p>
             <p>Time: ${time}</p>
             <p>Meeting Link: <a href="${meetingLink}">${meetingLink}</a></p>`,
    });

    res.json({
      success: true,
      message: "Interview scheduled and emails sent",
      data: updatedApplication,
    });
  } catch (err) {
    console.error("Error scheduling interview:", err);
    res.status(500).json({ error: "Failed to schedule interview" });
  }
};

exports.submitApplication = async (req, res) => {
  try {
    const {
      jobId,
      title,
      applicantId,
      personalInfo,
      contactInfo,
      experiences,
      educations,
      skills,
      certifications,
      languages,
      resume,
      coverLetter,
      portfolio,
      otherFiles,
    } = req.body;

    const newApplication = await prisma.application.create({
      data: {
        jobId,
        applicantId,
        personalInfo,
        contactInfo,
        experiences,
        educations,
        skills,
        certifications,
        languages,
        resume,
        coverLetter,
        portfolio,
        otherFiles,
      },
    });

    await sendEmail({
      to: contactInfo?.email,
      subject: `Application for ${title} Submitted Successfully!`,
      html: appSubmitEmailTemplate({
        fullName: personalInfo.fullName || "Candidate",
        jobTitle: newApplication.jobTitle || "the position",
      }),
    });

    res
      .status(201)
      .json({ message: "Application submitted", application: newApplication });
  } catch (error) {
    console.error("Error creating application:", error);
    res
      .status(500)
      .json({ message: "Failed to submit application", error: error.message });
  }
};
