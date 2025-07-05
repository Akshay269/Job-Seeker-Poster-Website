import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import API from "../api/axios";

const PostJobs = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      console.log(data);
      const res = await API.post("/jobs/post-job", data);
      toast.success(`Job "${res.data.title}" posted successfully!`);
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to post job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 mb-10 bg-white shadow-md rounded-lg mt-10">
      {loading && <Spinner isLoading={true} />}

      <h2 className="text-3xl font-bold mb-2 text-black">Post a Job</h2>
      <p className="text-gray-600 mb-6">
        Find the perfect candidate for your team
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Basic Information */}
        <div>
          <h3 className="text-xl font-bold mb-2 text-black">📋 Basic Information</h3>
          <p className="text-gray-600 mb-4">
            Provide the essential details about the job position
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="font-medium">Job Title *</label>
              <input
                {...register("title", { required: "Job title is required" })}
                placeholder="e.g. Senior React Developer"
                className={input}
              />
              {errors.title && <ErrorMsg msg={errors.title.message} />}
            </div>

            <div>
              <label className="font-medium">Company Name *</label>
              <input
                {...register("companyName", { required: "Company name is required" })}
                placeholder="e.g. TechCorp Inc."
                className={input}
              />
              {errors.companyName && <ErrorMsg msg={errors.companyName.message} />}
            </div>

            <div>
              <label className="font-medium">Location *</label>
              <input
                {...register("location", { required: "Location is required" })}
                placeholder="e.g. San Francisco, CA"
                className={input}
              />
              {errors.location && <ErrorMsg msg={errors.location.message} />}
            </div>

            <div>
              <label className="font-medium">Salary Range</label>
              <input
                {...register("salaryRange")}
                placeholder="e.g. $80,000 - $120,000"
                className={input}
              />
            </div>

            <div>
              <label className="font-medium">Job Type *</label>
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
              <label className="font-medium">Work Type *</label>
              <select
                {...register("workType", { required: "Work type is required" })}
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
              <label className="font-medium">Experience Level *</label>
              <select
                {...register("experienceLevel", { required: "Experience level is required" })}
                className={input}
              >
                <option value="">Select level</option>
                <option value="Entry">Entry</option>
                <option value="Mid">Mid</option>
                <option value="Senior">Senior</option>
              </select>
              {errors.experienceLevel && <ErrorMsg msg={errors.experienceLevel.message} />}
            </div>
          </div>
        </div>

        {/* Job Details */}
        <div>
          <h3 className="text-xl font-bold text-black mb-2">📄 Job Details</h3>
          <p className="text-gray-600 mb-4">Provide detailed information about the role and requirements</p>

          <div className="space-y-4">
            <div>
              <label className="font-medium">Job Description *</label>
              <textarea
                {...register("description", { required: "Description is required" })}
                placeholder="Describe the role, responsibilities, and what makes this position exciting…"
                className={textarea}
              />
              {errors.description && <ErrorMsg msg={errors.description.message} />}
            </div>

            <div>
              <label className="font-medium">Requirements *</label>
              <textarea
                {...register("requirements", { required: "Requirements are required" })}
                placeholder="List the required qualifications, experience, and skills…"
                className={textarea}
              />
              {errors.requirements && <ErrorMsg msg={errors.requirements.message} />}
            </div>

            <div>
              <label className="font-medium">Required Skills *</label>
              <input
                {...register("skills", { required: "Skills are required" })}
                placeholder="e.g. React, Node.js, TypeScript, AWS (comma separated)"
                className={input}
              />
              {errors.skills && <ErrorMsg msg={errors.skills.message} />}
            </div>

            <div>
              <label className="font-medium">Benefits & Perks</label>
              <textarea
                {...register("benefits")}
                placeholder="Health insurance, flexible hours, professional development, etc…"
                className={textarea}
              />
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-bold text-black mb-2">📞 Contact Information</h3>
          <p className="text-gray-600 mb-4">How candidates can reach out and apply</p>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="font-medium">Contact Email *</label>
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
              {errors.contactEmail && <ErrorMsg msg={errors.contactEmail.message} />}
            </div>

            <div>
              <label className="font-medium">Company Website</label>
              <input
                {...register("companyWebsite")}
                placeholder="https://www.company.com"
                className={input}
              />
            </div>

            <div>
              <label className="font-medium">Application Deadline</label>
              <input
                type="date"
                {...register("deadline")}
                className={input}
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={() => reset()}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Clear Form
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-900"
          >
            Post Job
          </button>
        </div>
      </form>
    </div>
  );
};

const input =
  "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-base";

const textarea =
  "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-base min-h-[120px]";

const ErrorMsg = ({ msg }) => (
  <p className="text-sm text-red-500 mt-1">{msg}</p>
);

export default PostJobs;
