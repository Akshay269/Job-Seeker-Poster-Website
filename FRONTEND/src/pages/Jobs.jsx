import { useEffect, useState, useCallback } from "react";
import SidebarFilters from "../components/SideBarFilters";
import API from "../api/axios";
import useAuthStore from "../store/authStore";
import { SkeletonJobCard } from "../components/ShimmerJobCard";


const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [ isLoading, setIsLoading ] = useState(true);
  const [userDrafts, setUserDrafts] = useState([]);
  const { user } = useAuthStore();
  const [filters, setFilters] = useState({
    title: "",
    location: "",
    jobType: "",
    experienceLevel: "",
  });

  const limit = 9;

  const fetchJobsAndDrafts = useCallback(async () => {
    setIsLoading(true);
    try {
      // Build query params dynamically based on filters
      const params = new URLSearchParams({
        page: currPage,
        limit,
        ...(filters.title && { title: filters.title }),
        ...(filters.location && { location: filters.location }),
        ...(filters.jobType && { jobType: filters.jobType }),
        ...(filters.experienceLevel && {
          experienceLevel: filters.experienceLevel,
        }),
      });

      const jobsRes = await API.get(`/jobs?${params.toString()}`);
      let jobsList = jobsRes.data.jobs;
      setTotalPages(jobsRes.data.totalPages);

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
      setIsLoading(false);
    }
  }, [currPage, filters, user, limit, setIsLoading]);

  useEffect(() => {
    fetchJobsAndDrafts();
  }, [fetchJobsAndDrafts]);

  const handleFilterChange = (newFilters) => {
    setCurrPage(1); // reset to first page when filters change
    setFilters(newFilters);
  };

  return (
    <div className="relative min-h-screen bg-gray-50">
      <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
        <SidebarFilters onFilterChange={handleFilterChange} />

        <main className="md:col-span-3">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Available Jobs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              Array.from({ length: limit }).map((_, i) => (
                <SkeletonJobCard key={i} />
              ))
            ) : jobs.length === 0 ? (
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
          <div className="flex justify-center mt-4 space-x-2">
            <button
              onClick={() => setCurrPage((p) => Math.max(p - 1, 1))}
              disabled={currPage === 1}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 cursor-pointer"
            >
              Previous
            </button>
            <span className="px-4 py-1 text-sm">
              Page {currPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrPage((p) => Math.min(p + 1, totalPages))}
              disabled={currPage === totalPages}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 cursor-pointer"
            >
              Next
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Jobs;
