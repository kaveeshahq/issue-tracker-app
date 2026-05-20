const express = require('express');
const {
  getIssues,
  getIssue,
  createIssue,
  updateIssue,
  deleteIssue,
  exportIssues,
} = require('../controllers/issue.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.use(protect); // all issue routes are protected

router.get('/export', exportIssues);
router.get('/', getIssues);
router.get('/:id', getIssue);
router.post('/', createIssue);
router.put('/:id', updateIssue);
router.delete('/:id', deleteIssue);

module.exports = router;