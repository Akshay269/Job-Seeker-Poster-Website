const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// POST /drafts
// Save or update a draft
exports.saveDraft = async (req, res) => {
  const { userId, jobId, data } = req.body;

  if (!userId || !jobId || !data) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const existingDraft = await prisma.draft.findFirst({
      where: { userId, jobId },
    });

    let draft;
    if (existingDraft) {
      draft = await prisma.draft.update({
        where: { id: existingDraft.id },
        data: { data },
      });
    } else {
      draft = await prisma.draft.create({
        data: { userId, jobId, data },
      });
    }

    res.status(200).json(draft);
  } catch (err) {
    console.error("Error saving draft:", err);
    res.status(500).json({ error: "Failed to save draft" });
  }
};

// GET /drafts/:userId
// Get all drafts for a user
exports.getUserDrafts = async (req, res) => {
  const { userId } = req.params;

  if (!userId) return res.status(400).json({ error: "Missing userId" });

  try {
    const drafts = await prisma.draft.findMany({
      where: { userId },
      select: {
        jobId: true,
        data: true,
        updatedAt: true,
      },
    });

    res.status(200).json(drafts);
  } catch (err) {
    console.error("Error fetching drafts:", err);
    res.status(500).json({ error: "Failed to fetch drafts" });
  }
};

// DELETE /drafts/:userId/:jobId
// Delete a specific draft for a user
exports.deleteDraft = async (req, res) => {
  const { userId, jobId } = req.params;

  if (!userId || !jobId) {
    return res.status(400).json({ error: "Missing userId or jobId" });
  }

  try {
    await prisma.draft.deleteMany({
      where: { userId, jobId },
    });

    res.status(200).json({ message: "Draft deleted" });
  } catch (err) {
    console.error("Error deleting draft:", err);
    res.status(500).json({ error: "Failed to delete draft" });
  }
};

exports.updateDraft = async (req, res) => {
  const { userId, jobId } = req.params;
  const { data } = req.body;

  if (!userId || !jobId || !data) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const existingDraft = await prisma.draft.findFirst({
      where: { userId, jobId },
    });

    let draft;

    if (existingDraft) {
      // ✅ Overwrite with new data (pruned for current step)
      draft = await prisma.draft.update({
        where: { id: existingDraft.id },
        data: {
          data,
          updatedAt: new Date(),
        },
      });
    } else {
      // ✅ Create if draft doesn't exist
      draft = await prisma.draft.create({
        data: {
          userId,
          jobId,
          data,
        },
      });
    }

    res.status(200).json(draft);
  } catch (err) {
    console.error("❌ Failed to update draft:", err);
    res.status(500).json({ error: "Server error" });
  }
};
