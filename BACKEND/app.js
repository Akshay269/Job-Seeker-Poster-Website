const express = require('express');
const cors = require('cors');
const authRoutes = require('./src/routes/authRoutes');
const jobRoutes=require('./src/routes/jobRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/jobs',jobRoutes);

module.exports = app;