import { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import SidebarFilters from "../components/SideBarFilters";
import API from "../api/axios";
import Spinner from "../components/Spinner";
import useAuthStore from "../store/authStore";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userDrafts, setUserDrafts] = useState([]);
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchJobsAndDrafts = async () => {
      try {
        const jobsRes = await API.get("/jobs");
        let jobsList = jobsRes.data;

        if (user?.id) {
          const draftsRes = await API.get(`/drafts/${user.id}`);
          const userDraftsList = draftsRes.data;

          const submittedAppsRes = await API.get(`/applications/user/${user.id}`);
          const submittedJobIds = new Set(
            submittedAppsRes.data.map((app) => app.job.id)
          );

          jobsList = jobsList.filter((job) => !submittedJobIds.has(job.id));

          setUserDrafts(userDraftsList);
        }

        setJobs(jobsList);
      } catch (err) {
        console.error("Failed to fetch jobs or drafts", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobsAndDrafts();
  }, [user]);

  return (
    <div className="relative min-h-screen bg-gray-50">
      {loading && (
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-50 flex items-center justify-center">
          <Spinner className="w-8 h-8 text-black" />
        </div>
      )}

      <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
        <SidebarFilters />

        <main className="md:col-span-3">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Available Jobs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.length === 0 && !loading ? (
              <p className="text-gray-500 col-span-full">No jobs found.</p>
            ) : (
              jobs.map((job) => {
                const draft = userDrafts.find((d) => d.jobId === job.id);
                return <JobCard key={job.id} job={job} draft={draft} role="APPLICANT" />;
              })
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Jobs;
