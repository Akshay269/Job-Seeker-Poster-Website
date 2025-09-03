import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api/axios";
const APIURL=import.meta.env.VITE_API_URL;


const JobDetails = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await API.get(`${APIURL}/jobs/${jobId}`);
        setJob(res.data);
      } catch (err) {
        console.error("Error fetching job", err);
      }
    };
    fetchJob();
  }, [jobId]);

  if (!job) {
    return <div className="text-center mt-10 text-white">Job not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-black to-pink-900 text-white px-4 py-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
         <h1 className="text-4xl leading-tight pb-1 font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text drop-shadow-lg">
  {job.title}
</h1>

          <Link
            to="/dashboard"
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg shadow hover:shadow-xl transition"
          >
            ← Back
          </Link>
        </div>

        {/* Job Info Card */}
        <div className="bg-gray-900/60 backdrop-blur-lg p-6 rounded-2xl shadow-lg space-y-4">
          <p className="text-gray-300">
            <span className="font-semibold text-white">Location:</span>{" "}
            {job.location}
          </p>
          <p className="text-gray-300">
            <span className="font-semibold text-white">Job Type:</span>{" "}
            {job.jobType}
          </p>
          <p className="text-gray-300">
            <span className="font-semibold text-white">Experience:</span>{" "}
            {job.experienceLevel}
          </p>
          <p className="text-gray-300">
            <span className="font-semibold text-white">Salary:</span>{" "}
            {job.salary || "Not disclosed"}
          </p>
          <p className="text-gray-300">
            <span className="font-semibold text-white">Company:</span>{" "}
            {job.companyName}
          </p>
          <p className="text-gray-300">
            <span className="font-semibold text-white">Category:</span>{" "}
            {job.category}
          </p>
          <p className="text-gray-300">
            <span className="font-semibold text-white">Posted On:</span>{" "}
            {new Date(job.createdAt).toLocaleDateString()}
          </p>
          <p className="text-gray-300">
            <span className="font-semibold text-white">Last Updated:</span>{" "}
            {new Date(job.updatedAt).toLocaleDateString()}
          </p>

          <div className="flex space-x-2">
            <h2 className="font-semibold text-white mb-2">Description:</h2>
            <p className="text-gray-300 whitespace-pre-line">
              {job.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
