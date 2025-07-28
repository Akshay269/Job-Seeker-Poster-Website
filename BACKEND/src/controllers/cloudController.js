require("dotenv").config();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

exports.getSignature = async (req, res) => {
  try {
    const timestamp = Math.round(new Date().getTime() / 1000);

    const signature = cloudinary.utils.api_sign_request(
      { timestamp, folder: "anvaya_uploads" },
      process.env.CLOUD_API_SECRET
    );

    res.json({
      timestamp,
      signature,
      apiKey: process.env.CLOUD_API_KEY,
      cloudName: process.env.CLOUD_NAME,
      folder: "anvaya_uploads",
    });
  } catch (error) {
    console.error("Error generating signature:", error);
    res.status(500).json({ error: "Failed to generate signature" });
  }
};

exports.deleteFile = async (req, res) => {
  const { publicId } = req.body;

  if (!publicId) {
    return res.status(400).json({ error: "publicId is required" });
  }

  try {
    let result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "raw",
    });

    if (result.result === "not found") {
      result = await cloudinary.uploader.destroy(publicId, {
        resource_type: "image",
      });
    }

    if (result.result !== "ok") {
      return res.status(400).json({ error: "Failed to delete file", result });
    }

    res.json({ success: true, result });
  } catch (err) {
    console.error("Cloudinary delete error", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
