const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAllJobs = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  // Extract filters from query params
  const { title, location, jobType, experienceLevel } = req.query;

  try {
    // Build the filtering object dynamically
    const filters = {
      status: "ACTIVE",
      ...(title && {
        title: {
          contains: title,
          mode: "insensitive", // case-insensitive search
        },
      }),
      ...(location && {
        location: {
          contains: location,
          mode: "insensitive",
        },
      }),
      ...(jobType && { jobType }), // exact match
      ...(experienceLevel && { experienceLevel }), // exact match
    };

    // Count total jobs for pagination
    const totalJobs = await prisma.job.count({
      where: filters,
    });

    // Fetch filtered jobs
    const jobs = await prisma.job.findMany({
      skip,
      take: limit,
      where: filters,
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
    console.error("Error fetching jobs:", err);
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
};


exports.getJobDetails = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const job = await prisma.job.findUnique({
      where: { id: jobId }
    });

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.status(200).json(job);
  } catch (error) {
    console.error("Error fetching job:", error);
    res.status(500).json({ error: "Internal server error" });
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
    contactEmail,
    companyWebsite,
    deadline,
    companyIcon,
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
    const userId = req.user.userId;
    const userRole = req.user.role;

    if (userRole !== "ADMIN") {
      return res.status(403).json({ error: "Access denied" });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const skip = (page - 1) * limit;

    // Filters
    const { title, location, jobType, experienceLevel } = req.query;
    const filters = {
      postedById: userId,
      ...(title && { title: { contains: title, mode: "insensitive" } }),
      ...(location && {
        location: { contains: location, mode: "insensitive" },
      }),
      ...(jobType && { jobType }),
      ...(experienceLevel && { experienceLevel }),
    };

    const totalJobs = await prisma.job.count({ where: filters });

    const jobs = await prisma.job.findMany({
      where: filters,
      orderBy: { createdAt: "desc" },
      include: { applications: true },
      skip,
      take: limit,
    });

    res.status(200).json({
      jobs,
      totalPages: Math.ceil(totalJobs / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching admin jobs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

