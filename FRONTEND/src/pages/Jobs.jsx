import { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import SidebarFilters from "../components/SideBarFilters";
import API from "../api/axios";
import useAuthStore from "../store/authStore";
import { useLoading } from "../context/LoadingContext";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { isLoading,setIsLoading } = useLoading();
  const [userDrafts, setUserDrafts] = useState([]);
  const { user } = useAuthStore();
  const limit = 10;

  useEffect(() => {
    const fetchJobsAndDrafts = async () => {
      setIsLoading(true);
      try {
        const jobsRes = await API.get(`/jobs?page=${currPage}&limit=${limit}`);
        let jobsList = jobsRes.data.jobs;
        setTotalPages(jobsRes.data.totalPages);

        if (user?.id) {
          const draftsRes = await API.get(`/drafts/${user.id}`);
          const userDraftsList = draftsRes.data;

          const submittedAppsRes = await API.get(
            `/applications/user/${user.id}`
          );
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
        setIsLoading(false);
      }
    };

    fetchJobsAndDrafts();
  }, [user, currPage]);

  return (
    <div className="relative min-h-screen bg-gray-50">
      <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
        <SidebarFilters />

        <main className="md:col-span-3">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Available Jobs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.length === 0 && !isLoading ? (
              <p className="text-gray-500 col-span-full">No jobs found.</p>
            ) : (
              jobs.map((job) => {
                const draft = userDrafts.find((d) => d.jobId === job.id);
                return (
                  <JobCard
                    key={job.id}
                    job={job}
                    draft={draft}
                    role={user?.role}
                  />
                );
              })
            )}
          </div>
        </main>

        <div className="flex justify-center mt-4 space-x-2">
          <button
            onClick={() => setCurrPage((p) => Math.max(p - 1, 1))}
            disabled={currPage === 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-1 text-sm">
            Page {currPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrPage((p) => Math.min(p + 1, totalPages))}
            disabled={currPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
