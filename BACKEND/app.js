const express = require('express');
const cors = require('cors');
const authRoutes = require('./src/routes/authRoutes');
const jobRoutes=require('./src/routes/jobRoutes');
const appRoutes=require('./src/routes/appRoutes');
const cloudRoutes=require('./src/routes/cloudRoutes');
const draftRoutes=require('./src/routes/draftRoutes');

const app = express();

app.use(cors());
app.use(express.json());
// await initGoogleAuth();
app.use('/api/auth', authRoutes);
app.use('/api/jobs',jobRoutes);
app.use('/api/applications',appRoutes);
app.use('/api/cloudinary',cloudRoutes);
app.use('/api/drafts',draftRoutes);

module.exports = app;