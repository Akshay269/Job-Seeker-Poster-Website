import { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import SidebarFilters from "../components/SideBarFilters";
import API from "../api/axios";
import { Link } from "react-router-dom";
import { SkeletonJobCard } from "../components/ShimmerJobCard";
const APIURL=import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 9;
  const [filters, setFilters] = useState({});

  const fetchAdminJobs = async (page, filters) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page,
        limit,
        ...filters,
      }).toString();

      const res = await API.get(`/jobs/postedjobs?${params}`);
      setJobs(res.data.jobs);
      setTotalPages(res.data.totalPages);
      setCurrentPage(res.data.currentPage);
    } catch (err) {
      console.error("Failed to fetch admin jobs", err);
    } finally {
      setTimeout(() => setIsLoading(false), 500);
    }
  };
  useEffect(() => {
    fetchAdminJobs(currentPage, filters);
  }, [currentPage, filters]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-black to-pink-900 text-white">
      <div className="px-4 py-8 max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
        <div className="md:col-span-1">
          <SidebarFilters
            onFilterChange={(f) => {
              setCurrentPage(1);
              setFilters(f);
            }}
          />
        </div>

        <main className="md:col-span-3">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text drop-shadow-lg">
              Your Posted Jobs
            </h2>
            <Link
              to="/post-job"
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition duration-300 text-sm font-medium"
            >
              + Post New Job
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              Array.from({ length: 9 }).map((_, idx) => (
                <SkeletonJobCard key={idx} />
              ))
            ) : jobs.length === 0 ? (
              <p className="text-gray-300 col-span-full text-center">
                No jobs posted yet.
              </p>
            ) : (
              jobs.map((job) => <JobCard key={job.id} job={job} role="ADMIN" />)
            )}
          </div>
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6 space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-purple-600 rounded disabled:opacity-50"
              >
                Prev
              </button>
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePageChange(idx + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === idx + 1
                      ? "bg-pink-600"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-purple-600 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
