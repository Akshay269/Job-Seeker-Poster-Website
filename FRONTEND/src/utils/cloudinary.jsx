
import API from "../api/axios";
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

const getUploadSignature = async () => {
  const res = await API.get(`/cloudinary/signature`);
  return await res.data;
};

export const uploadToCloudinary = async (file) => {
  const { timestamp, signature, apiKey, folder } = await getUploadSignature();
  const formData = new FormData();

  formData.append("file", file);
  formData.append("api_key", apiKey);
  formData.append("timestamp", timestamp);
  formData.append("signature", signature);
  formData.append("folder", folder);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) throw new Error("Upload failed");

  const data = await res.json();
  return { url: data.secure_url, publicId: data.public_id };
};

export const deleteFromCloudinary = async (publicId) => {
  await API.post(`/cloudinary/delete`, { publicId });
};

