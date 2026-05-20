const Issue = require('../models/Issue');
const buildIssueQuery = require('../utils/buildIssueQuery');

// Get all issues with search, filter, pagination
const getIssues = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const query = buildIssueQuery(req.query, req.user._id);

    const total = await Issue.countDocuments(query);
    const issues = await Issue.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const statusCounts = await Issue.aggregate([
      { $match: { createdBy: req.user._id } },
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    return res.status(200).json({
      success: true,
      data: {
        issues,
        statusCounts,
        pagination: {
          total,
          page,
          pages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get single issue
const getIssue = async (req, res) => {
  try {
    const issue = await Issue.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!issue) {
      return res.status(404).json({ success: false, message: 'Issue not found' });
    }

    return res.status(200).json({ success: true, data: issue });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Create issue
const createIssue = async (req, res) => {
  try {
    const { title, description, priority, severity } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, message: 'Title is required' });
    }

    const issue = await Issue.create({
      title,
      description,
      priority,
      severity,
      createdBy: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: 'Issue created successfully',
      data: issue,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Update issue
const updateIssue = async (req, res) => {
  try {
    const issue = await Issue.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!issue) {
      return res.status(404).json({ success: false, message: 'Issue not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Issue updated successfully',
      data: issue,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Delete issue
const deleteIssue = async (req, res) => {
  try {
    const issue = await Issue.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!issue) {
      return res.status(404).json({ success: false, message: 'Issue not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Issue deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Export issues as JSON
const exportIssues = async (req, res) => {
  try {
    const issues = await Issue.find({ createdBy: req.user._id }).lean();

    return res.status(200).json({
      success: true,
      data: issues,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getIssues, getIssue, createIssue, updateIssue, deleteIssue, exportIssues };