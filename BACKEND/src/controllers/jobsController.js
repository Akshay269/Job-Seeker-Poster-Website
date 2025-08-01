const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAllJobs = async (req, res) => {
  const page=parseInt(req.query.page)||1;
  const limit=parseInt(req.query.limit)||10;
  const skip=(page-1)*limit;
  try {
    const totalJobs=await prisma.job.count();
    const jobs = await prisma.job.findMany({
      skip,
      take:limit,

      where: {
        status: "ACTIVE",
      },
      include: {
        postedBy: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

     res.status(200).json({
      jobs,
      totalJobs,
      currentPage: page,
      totalPages: Math.ceil(totalJobs / limit),
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
};

exports.getJobDetails = async (req, res) => {
  const { jobId } = req.params;

  try {
    const job = await prisma.job.findUnique({
      where: {
        id: jobId,
      },
      include: {
        postedBy: {
          select: {
            id: true,
            name: true,
            email: true,
            companyName: true,
          },
        },
      },
    });

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json(job);
  } catch (err) {
    console.error("Failed to fetch job details:", err);
    res.status(500).json({ message: "Failed to fetch job details" });
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
    deadline,
    companyIcon
  } = req.body;
  // console.log("user", req.user);
  const userId = req.user.userId;

  try {
    const newJob = await prisma.job.create({
      data: {
        title,
        companyName,
        location,
        companyIcon,
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
      },
    });

    res.status(201).json(newJob);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create job posting" });
  }
};

exports.getPostedJobs = async (req, res) => {
  try {
    // console.log("postreq",req.user);
    const userId = req.user.userId;
    const userRole = req.user.role;

    if (userRole !== "ADMIN") {
      return res.status(403).json({ error: "Access denied" });
    }

    const jobs = await prisma.job.findMany({
      where: {
        postedById: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        applications: true,
      },
    });
    console.log(jobs);

    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching admin jobs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
