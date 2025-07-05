const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await prisma.job.findMany({
      include: {
        postedBy: {
          select: { companyName: true, email: true },
        },
        applications: true,
      },
      orderBy: { createdAt: "desc" },
    });

    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
};

exports.getJobById = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const job = await prisma.job.findUnique({
      where: { id: jobId },
      include: {
        postedBy: {
          select: { companyName: true, email: true },
        },
      },
    });
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(job);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch job" });
  }
};





exports.postJob = async (req, res) => {
  const {
    title,
    companyName,
    location,
    salaryRange,
    jobType,
    workType,
    experienceLevel,
    description,
    requirements,
    skills,
    benefits,
    contactEmail,
    companyWebsite,
    deadline
  } = req.body;
  console.log("user",req.user);
  const userId = req.user.userId; 

  try {
    const newJob = await prisma.job.create({
      data: {
        title,
        companyName,
        location,
        salaryRange,
        jobType,
        workType,
        experienceLevel,
        description,
        requirements,
        skills,
        benefits,
        contactEmail,
        companyWebsite,
        deadline: deadline ? new Date(deadline) : null,
        postedById: userId, 
      }
    });

    res.status(201).json(newJob);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create job posting" });
  }
};

