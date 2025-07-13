const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getApplicationsbyId = async (req, res) => {
  const { jobId } = req.params;

  try {
    const applications = await prisma.application.findMany({
      where: {
        jobId,
      },
      include: {
        applicant: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        job: {
          select: {
            title: true,
            companyName: true,
          },
        },
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
exports.submitApplication = async (req, res) => {
  try {
    const {
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
