const express = require('express');
const router = express.Router();
const {
  saveDraft,
  getUserDrafts,
  deleteDraft,
  updateDraft
} = require('../controllers/draftController');

const requireAuth = require('../middleware/authMiddleware');

router.post('/', requireAuth, saveDraft);

router.get('/:userId', requireAuth, getUserDrafts);

router.put('/:userId/:jobId',updateDraft);

router.delete('/:userId/:jobId', requireAuth, deleteDraft);

module.exports = router;
