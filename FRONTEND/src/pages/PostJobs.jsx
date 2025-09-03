import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { useState, useRef } from "react";
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

const getUploadSignature = async () => {
  const res = await API.get(`/cloudinary/signature`);
  return await res.data;
};

const uploadToCloudinary = async (file) => {
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

const deleteFromCloudinary = async (publicId) => {
  await API.post(`/cloudinary/delete`, { publicId });
};
const PostJobs = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const [logoUrl, setLogoUrl] = useState("");
  const logoUrlRef = useRef("");
  const [logoPublicId, setLogoPublicId] = useState("");
  const fileInputRef = useRef(null);

  const handleLogoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
    
      const { url, publicId } = await uploadToCloudinary(file);
      setLogoUrl(url);
      setLogoPublicId(publicId);
      logoUrlRef.current = url;
      toast.success("Logo uploaded");
    } catch {
      toast.error("Logo upload failed");
    } 
  };

  const removeLogo = async () => {
    if (logoPublicId) {
      await deleteFromCloudinary(logoPublicId);
      setLogoUrl("");
      setLogoPublicId("");
    }
  };

  const onSubmit = async (data) => {
   
    if (!logoUrlRef.current) {
      toast.error("Please upload a company logo before submitting.");
   
      return;
    }
    try {
      const payload = {
        ...data,
        companyIcon: logoUrlRef.current,
      };
      const res = await API.post("/jobs/post-job", payload);
      toast.success(`Job "${res.data.title}" posted successfully!`);
      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to post job");
    } 
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-md border border-gray-200">
        <h2 className="text-3xl font-semibold text-gray-900 mb-2">
          ✨ Post a Job
        </h2>
        <p className="text-gray-600 mb-6">
          Find the perfect candidate for your team.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          {/* Logo Upload */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-1">
              🏢 Company Logo
            </h3>
            <p className="text-gray-500 mb-3 text-sm cursor-pointer">
              Upload your company logo (image only)
            </p>

            {logoUrl ? (
              <div className="relative w-32 h-32 mb-2">
                <img
                  src={logoUrl}
                  alt="Company Logo"
                  className="object-cover w-full h-full rounded"
                />
                <button
                  type="button"
                  onClick={removeLogo}
                  className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded cursor-pointer"
                >
                  ✕
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="px-4 py-2 border border-gray-300 rounded-md bg-white shadow-sm hover:bg-gray-100"
              >
                Upload Logo
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={handleLogoChange}
            />
          </div>
          {/* Basic Information */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-1">
              📋 Basic Information
            </h3>
            <p className="text-gray-500 mb-4 text-sm">
              Provide the essential details about the job.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-sm text-gray-700 mb-1">
                  Job Title *
                </label>
                <input
                  {...register("title", { required: "Job title is required" })}
                  placeholder="e.g. Senior React Developer"
                  className={input}
                />
                {errors.title && <ErrorMsg msg={errors.title.message} />}
              </div>
              <div>
                <label className="block font-medium text-sm text-gray-700 mb-1">
                  Company Name *
                </label>
                <input
                  {...register("companyName", {
                    required: "Company name is required",
                  })}
                  placeholder="e.g. TechCorp Inc."
                  className={input}
                />
                {errors.companyName && (
                  <ErrorMsg msg={errors.companyName.message} />
                )}
              </div>
              <div>
                <label className="block font-medium text-sm text-gray-700 mb-1">
                  Location *
                </label>
                <input
                  {...register("location", {
                    required: "Location is required",
                  })}
                  placeholder="e.g. San Francisco, CA"
                  className={input}
                />
                {errors.location && <ErrorMsg msg={errors.location.message} />}
              </div>
              <div>
                <label className="block font-medium text-sm text-gray-700 mb-1">
                  Salary Range
                </label>
                <input
                  {...register("salaryRange", {
                    required: "Salary range is required",
                    validate: (value) => {
                      const match = value.match(
                        /^\$?(\d+(?:,\d+)?)(k|K)?(?:\s*-\s*\$?(\d+(?:,\d+)?)(k|K)?)?$/
                      );

                      if (!match) {
                        return "Invalid format. Example: 50k - 100k or $80,000 - $120,000";
                      }

                      let min = parseInt(match[1].replace(/,/g, ""));
                      let max = match[3]
                        ? parseInt(match[3].replace(/,/g, ""))
                        : null;

                      // If "k" suffix is present, multiply by 1000
                      if (match[2]) min *= 1000;
                      if (max && match[4]) max *= 1000;

                      if (max && min >= max) {
                        return "Minimum salary must be less than maximum salary";
                      }

                      if (min <= 0 || (max && max <= 0)) {
                        return "Salary must be positive";
                      }

                      return true;
                    },
                  })}
                  placeholder="e.g. $80,000 - $120,000"
                  className={input}
                />
                {errors.salaryRange && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.salaryRange.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-medium text-sm text-gray-700 mb-1">
                  Job Type *
                </label>
                <select
                  {...register("jobType", { required: "Job type is required" })}
                  className={input}
                >
                  <option value="">Select type</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Internship">Internship</option>
                  <option value="Contract">Contract</option>
                </select>
                {errors.jobType && <ErrorMsg msg={errors.jobType.message} />}
              </div>
              <div>
                <label className="block font-medium text-sm text-gray-700 mb-1">
                  Work Type *
                </label>
                <select
                  {...register("workType", {
                    required: "Work type is required",
                  })}
                  className={input}
                >
                  <option value="">Select work type</option>
                  <option value="Remote">Remote</option>
                  <option value="On-site">On-site</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
                {errors.workType && <ErrorMsg msg={errors.workType.message} />}
              </div>
              <div>
                <label className="block font-medium text-sm text-gray-700 mb-1">
                  Experience Level *
                </label>
                <select
                  {...register("experienceLevel", {
                    required: "Experience level is required",
                  })}
                  className={input}
                >
                  <option value="">Select level</option>
                  <option value="Entry">Entry</option>
                  <option value="Mid">Mid</option>
                  <option value="Senior">Senior</option>
                </select>
                {errors.experienceLevel && (
                  <ErrorMsg msg={errors.experienceLevel.message} />
                )}
              </div>
            </div>
          </div>

          {/* Job Details */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-1">
              📄 Job Details
            </h3>
            <p className="text-gray-500 mb-4 text-sm">
              Provide detailed information about the role and requirements
            </p>
            <div className="space-y-4">
              <div>
                <label className="block font-medium text-sm text-gray-700 mb-1">
                  Job Description *
                </label>
                <textarea
                  {...register("description", {
                    required: "Description is required",
                  })}
                  placeholder="Describe the role..."
                  className={textarea}
                />
                {errors.description && (
                  <ErrorMsg msg={errors.description.message} />
                )}
              </div>
              <div>
                <label className="block font-medium text-sm text-gray-700 mb-1">
                  Requirements *
                </label>
                <textarea
                  {...register("requirements", {
                    required: "Requirements are required",
                  })}
                  placeholder="List the required qualifications..."
                  className={textarea}
                />
                {errors.requirements && (
                  <ErrorMsg msg={errors.requirements.message} />
                )}
              </div>
              <div>
                <label className="block font-medium text-sm text-gray-700 mb-1">
                  Required Skills *
                </label>
                <input
                  {...register("skills", { required: "Skills are required" })}
                  placeholder="e.g. React, Node.js"
                  className={input}
                />
                {errors.skills && <ErrorMsg msg={errors.skills.message} />}
              </div>
              <div>
                <label className="block font-medium text-sm text-gray-700 mb-1">
                  Benefits & Perks
                </label>
                <textarea
                  {...register("benefits")}
                  placeholder="Health insurance, flexible hours, etc..."
                  className={textarea}
                />
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-1">
              📞 Contact Information
            </h3>
            <p className="text-gray-500 mb-4 text-sm">
              How candidates can reach out and apply
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-sm text-gray-700 mb-1">
                  Contact Email *
                </label>
                <input
                  {...register("contactEmail", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email format",
                    },
                  })}
                  placeholder="careers@company.com"
                  className={input}
                />
                {errors.contactEmail && (
                  <ErrorMsg msg={errors.contactEmail.message} />
                )}
              </div>
              <div>
                <label className="block font-medium text-sm text-gray-700 mb-1">
                  Company Website
                </label>
                <input
                  {...register("companyWebsite")}
                  placeholder="https://www.company.com"
                  className={input}
                />
              </div>
              <div>
                <label className="block font-medium text-sm text-gray-700 mb-1">
                  Application Deadline *
                </label>
                <input
                  type="date"
                  {...register("deadline", {
                    required: "Deadline is required",
                  })}
                  className={input}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={() => reset()}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer"
            >
              Clear Form
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 cursor-pointer"
            >
              Post Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const input =
  "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-base bg-white shadow-sm";

const textarea =
  "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-base min-h-[120px] bg-white shadow-sm";

const ErrorMsg = ({ msg }) => (
  <p className="text-sm text-red-500 mt-1">{msg}</p>
);

export default PostJobs;
