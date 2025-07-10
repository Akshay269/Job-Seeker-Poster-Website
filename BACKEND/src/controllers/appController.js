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
        createdAt: "desc",
      },
    });

    res.json(applications);
  } catch (err) {
    console.error("Failed to get applications by job ID", err);
    res.status(500).json({ error: "Something went wrong" });
  }
};
