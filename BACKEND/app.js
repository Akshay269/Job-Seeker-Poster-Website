const express = require("express");
const cors = require("cors");
const authRoutes = require("./src/routes/authRoutes");
const jobRoutes = require("./src/routes/jobRoutes");
const appRoutes = require("./src/routes/appRoutes");
const cloudRoutes = require("./src/routes/cloudRoutes");
const draftRoutes = require("./src/routes/draftRoutes");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
// await initGoogleAuth();
app.use("/auth", authRoutes);
app.use("/jobs", jobRoutes);
app.use("/applications", appRoutes);
app.use("/cloudinary", cloudRoutes);
app.use("/drafts", draftRoutes);

module.exports = app;
