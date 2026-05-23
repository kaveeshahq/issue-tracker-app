const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const issueRoutes = require('./routes/issue.routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5174' }));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Issue Tracker API is running!' });
});

app.use('/api/auth', authRoutes);
app.use('/api/issues', issueRoutes);

app.use(errorHandler);

module.exports = app;