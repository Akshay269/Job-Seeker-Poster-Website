import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../context/LoadingContext";
import API from "../api/axios";

const PostJobs = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { setIsLoading } = useLoading();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
       setIsLoading(true);
    try {
      console.log(data);
      const res = await API.post("/jobs/post-job", data);
      toast.success(`Job "${res.data.title}" posted successfully!`);
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to post job");
    } finally {
         setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white py-10 px-4">

      <div className="max-w-5xl mx-auto bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-md border border-gray-200">
        <h2 className="text-3xl font-semibold text-gray-900 mb-2">✨ Post a Job</h2>
        <p className="text-gray-600 mb-6">Find the perfect candidate for your team.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          {/* Basic Information */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-1">📋 Basic Information</h3>
            <p className="text-gray-500 mb-4 text-sm">Provide the essential details about the job.</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-sm text-gray-700 mb-1">Job Title *</label>
                <input {...register("title", { required: "Job title is required" })} placeholder="e.g. Senior React Developer" className={input} />
                {errors.title && <ErrorMsg msg={errors.title.message} />}
              </div>
              <div>
                <label className="block font-medium text-sm text-gray-700 mb-1">Company Name *</label>
                <input {...register("companyName", { required: "Company name is required" })} placeholder="e.g. TechCorp Inc." className={input} />
                {errors.companyName && <ErrorMsg msg={errors.companyName.message} />}
              </div>
              <div>
                <label className="block font-medium text-sm text-gray-700 mb-1">Location *</label>
                <input {...register("location", { required: "Location is required" })} placeholder="e.g. San Francisco, CA" className={input} />
                {errors.location && <ErrorMsg msg={errors.location.message} />}
              </div>
              <div>
                <label className="block font-medium text-sm text-gray-700 mb-1">Salary Range</label>
                <input {...register("salaryRange")} placeholder="e.g. $80,000 - $120,000" className={input} />
              </div>
              <div>
                <label className="block font-medium text-sm text-gray-700 mb-1">Job Type *</label>
                <select {...register("jobType", { required: "Job type is required" })} className={input}>
                  <option value="">Select type</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Internship">Internship</option>
                  <option value="Contract">Contract</option>
                </select>
                {errors.jobType && <ErrorMsg msg={errors.jobType.message} />}
              </div>
              <div>
                <label className="block font-medium text-sm text-gray-700 mb-1">Work Type *</label>
                <select {...register("workType", { required: "Work type is required" })} className={input}>
                  <option value="">Select work type</option>
                  <option value="Remote">Remote</option>
                  <option value="On-site">On-site</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
                {errors.workType && <ErrorMsg msg={errors.workType.message} />}
              </div>
              <div>
                <label className="block font-medium text-sm text-gray-700 mb-1">Experience Level *</label>
                <select {...register("experienceLevel", { required: "Experience level is required" })} className={input}>
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
            <h3 className="text-xl font-semibold text-gray-800 mb-1">📄 Job Details</h3>
            <p className="text-gray-500 mb-4 text-sm">Provide detailed information about the role and requirements</p>
            <div className="space-y-4">
              <div>
                <label className="block font-medium text-sm text-gray-700 mb-1">Job Description *</label>
                <textarea {...register("description", { required: "Description is required" })} placeholder="Describe the role..." className={textarea} />
                {errors.description && <ErrorMsg msg={errors.description.message} />}
              </div>
              <div>
                <label className="block font-medium text-sm text-gray-700 mb-1">Requirements *</label>
                <textarea {...register("requirements", { required: "Requirements are required" })} placeholder="List the required qualifications..." className={textarea} />
                {errors.requirements && <ErrorMsg msg={errors.requirements.message} />}
              </div>
              <div>
                <label className="block font-medium text-sm text-gray-700 mb-1">Required Skills *</label>
                <input {...register("skills", { required: "Skills are required" })} placeholder="e.g. React, Node.js" className={input} />
                {errors.skills && <ErrorMsg msg={errors.skills.message} />}
              </div>
              <div>
                <label className="block font-medium text-sm text-gray-700 mb-1">Benefits & Perks</label>
                <textarea {...register("benefits") } placeholder="Health insurance, flexible hours, etc..." className={textarea} />
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-1">📞 Contact Information</h3>
            <p className="text-gray-500 mb-4 text-sm">How candidates can reach out and apply</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-sm text-gray-700 mb-1">Contact Email *</label>
                <input {...register("contactEmail", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })} placeholder="careers@company.com" className={input} />
                {errors.contactEmail && <ErrorMsg msg={errors.contactEmail.message} />}
              </div>
              <div>
                <label className="block font-medium text-sm text-gray-700 mb-1">Company Website</label>
                <input {...register("companyWebsite")} placeholder="https://www.company.com" className={input} />
              </div>
              <div>
                <label className="block font-medium text-sm text-gray-700 mb-1">Application Deadline</label>
                <input type="date" {...register("deadline")} className={input} />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button type="button" onClick={() => reset()} className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100">
              Clear Form
            </button>
            <button type="submit" className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
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
