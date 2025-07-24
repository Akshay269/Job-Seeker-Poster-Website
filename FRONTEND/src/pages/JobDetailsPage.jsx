import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import { Loader2Icon } from "lucide-react";
import { useLoading } from "../context/LoadingContext";

const JobDetails = () => {
  const { id } = useParams();
  const { isLoading, setIsLoading } = useLoading();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setIsLoading(true);
        const res = await API.get(`/jobs/${id}`);
        setJob(res.data);
      } catch (err) {
        console.error("Failed to fetch job", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJob();
  }, [id, setIsLoading]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
        <Loader2Icon className="w-10 h-10 animate-spin text-white" />
      </div>
    );
  }

  if (!job) {
    return <div className="text-center mt-10 text-white">Job not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-white">
      <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
        {job.title}
      </h1>
      <p className="text-gray-300 mb-2">
        <strong>Company:</strong> {job.companyName || "N/A"}
      </p>
      <p className="text-gray-300 mb-2">
        <strong>Location:</strong> {job.location || "Remote"}
      </p>
      <p className="text-gray-300 mb-2">
        <strong>Type:</strong> {job.type || "Full-time"}
      </p>
      {/* <p className="text-gray-300 mb-2">
        <strong>Experience:</strong> {job.experienceLevel || "Not specified"}
      </p> */}
      <p className="text-gray-300 mb-2">
        <strong>Salary:</strong> {job.salaryRange || "Not disclosed"}
      </p>
      <p className="text-gray-300 mb-6">
        <strong>Deadline:</strong> {job.applicationDeadline || "Not set"}
      </p>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-pink-400 mb-2">Description</h2>
        <p className="text-gray-200 whitespace-pre-line">{job.description}</p>
      </div>

      {job.requirements && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-purple-400 mb-2">Requirements</h2>
          <ul className="list-disc list-inside text-gray-200 space-y-1">
            {job.requirements.split('\n').map((req, idx) => (
              <li key={idx}>{req}</li>
            ))}
          </ul>
        </div>
      )}

      {job.skills && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-pink-400 mb-2">Required Skills</h2>
          <div className="flex flex-wrap gap-2">
            {job.skills.split(',').map((skill, idx) => (
              <span
                key={idx}
                className="bg-purple-600 text-white text-sm px-3 py-1 rounded-full"
              >
                {skill.trim()}
              </span>
            ))}
          </div>
        </div>
      )}

      {job.perks && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-purple-400 mb-2">Benefits & Perks</h2>
          <p className="text-gray-200 whitespace-pre-line">{job.perks}</p>
        </div>
      )}

      <div className="mt-6">
        <a
          href={`mailto:${job.contactEmail}`}
          className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg hover:opacity-90 transition"
        >
          Apply Now
        </a>
      </div>
    </div>
  );
};

export default JobDetails;
