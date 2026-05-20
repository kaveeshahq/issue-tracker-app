const buildIssueQuery = (queryParams, userId) => {
  const { search, status, priority, severity } = queryParams;
  const query = { createdBy: userId };

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }

  if (status) query.status = status;
  if (priority) query.priority = priority;
  if (severity) query.severity = severity;

  return query;
};

module.exports = buildIssueQuery;