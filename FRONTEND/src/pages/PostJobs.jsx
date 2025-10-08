import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { useState, useRef } from "react";
import {deleteFromCloudinary,uploadToCloudinary} from "../utils/cloudinary";

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
  const [jdUrl, setJdUrl] = useState("");
  const [jdPublicId, setJdPublicId] = useState("");
  const [jdError, setJdError] = useState("");
  const jdFileInputRef = useRef(null);

  
  const handleJDChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setJdError("Please upload a valid PDF file.");
      return;
    }

    try {
      const { url, publicId } = await uploadToCloudinary(file);
      setJdUrl(url);
      setJdPublicId(publicId);
      setJdError("");
      toast.success("JD uploaded successfully!");
    } catch {
      setJdError("JD upload failed.");
      toast.error("JD upload failed");
    }
  };

  const removeJD = async () => {
    if (jdPublicId) {
      await deleteFromCloudinary(jdPublicId);
      setJdUrl("");
      setJdPublicId("");
    }
  };

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

    if (!jdUrl) {
      toast.error("Please upload a Job Description PDF before submitting.");
      return;
    }

    try {
      const payload = {
        ...data,
        companyIcon: logoUrlRef.current,
        jobDescriptionFile: jdUrl, // 👈 add JD file URL
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
                  Salary Range (in ₹)
                </label>

                <div className="flex gap-3">
                  {/* Min Salary */}
                  <div className="flex-1">
                    <input
                      type="text"
                      {...register("minSalary", {
                        required: "Minimum salary is required",
                        validate: (value) => {
                          const match = value.match(
                            /^₹?\s*(\d{1,3}(?:,\d{3})*|\d+)(k|K)?$/
                          );
                          if (!match) {
                            return "Invalid format. Example: 50k or ₹50,000";
                          }

                          let min = parseInt(match[1].replace(/,/g, ""));
                          if (match[2]) min *= 1000;
                          if (min <= 0) return "Salary must be positive";

                          return true;
                        },
                      })}
                      placeholder="Minimum Pay"
                      className={input}
                    />
                    {errors.minSalary && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.minSalary.message}
                      </p>
                    )}
                  </div>

                  {/* Max Salary */}
                  <div className="flex-1">
                    <input
                      type="text"
                      {...register("maxSalary", {
                        required: "Maximum salary is required",
                        validate: (value, formValues) => {
                          const match = value.match(
                            /^₹?\s*(\d{1,3}(?:,\d{3})*|\d+)(k|K)?$/
                          );
                          if (!match) {
                            return "Invalid format. Example: 100k or ₹1,00,000";
                          }

                          let max = parseInt(match[1].replace(/,/g, ""));
                          if (match[2]) max *= 1000;
                          if (max <= 0) return "Salary must be positive";

                          // compare with min salary if available
                          const minValue = formValues.minSalary?.match(
                            /^₹?\s*(\d{1,3}(?:,\d{3})*|\d+)(k|K)?$/
                          );
                          if (minValue) {
                            let min = parseInt(minValue[1].replace(/,/g, ""));
                            if (minValue[2]) min *= 1000;
                            if (min >= max)
                              return "Max salary must be greater than min salary";
                          }

                          return true;
                        },
                      })}
                      placeholder="Maximum Pay"
                      className={input}
                    />
                    {errors.maxSalary && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.maxSalary.message}
                      </p>
                    )}
                  </div>
                </div>
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
                  Experience Level *
                </label>
                <select
                  {...register("experienceLevel", {
                    required: "Experience level is required",
                  })}
                  className={input}
                >
                  <option value="">Select level</option>
                  <option value="Entry">Entry Level (0 -1)</option>
                  <option value="Mid">Mid Level (2-5)</option>
                  <option value="Senior">Senior Level (5-10)</option>
                </select>
                {errors.experienceLevel && (
                  <ErrorMsg msg={errors.experienceLevel.message} />
                )}
              </div>
            </div>
          </div>

          {/* Job Description PDF Upload */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-1">
              📄 Job Description (PDF Upload)
            </h3>
            <p className="text-gray-500 mb-4 text-sm">
              Upload a detailed Job Description in PDF format.
            </p>

            <div>
              {jdUrl ? (
                <div className="flex items-center gap-3">
                  <a
                    href={jdUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    View Uploaded JD
                  </a>
                  <button
                    type="button"
                    onClick={removeJD}
                    className="px-2 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => jdFileInputRef.current.click()}
                  className="px-4 py-2 border border-gray-300 rounded-md bg-white shadow-sm hover:bg-gray-100"
                >
                  Upload JD (PDF)
                </button>
              )}

              <input
                ref={jdFileInputRef}
                type="file"
                accept="application/pdf"
                hidden
                onChange={handleJDChange}
              />
            </div>

            {jdError && <p className="text-red-500 text-sm mt-1">{jdError}</p>}
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
  "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-base bg-white-200 shadow-sm";

const ErrorMsg = ({ msg }) => (
  <p className="text-sm text-red-500 mt-1">{msg}</p>
);

export default PostJobs;
