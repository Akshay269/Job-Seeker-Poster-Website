import { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import SidebarFilters from "../components/SideBarFilters";
import API from "../api/axios";
import Spinner from "../components/Spinner";

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminJobs = async () => {
      try {
        const res = await API.get("/jobs/postedjobs");
        setJobs(res.data);
      } catch (err) {
        console.error("Failed to fetch admin jobs", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminJobs();
  }, []);

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Spinner Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-50 flex items-center justify-center">
          <Spinner className="w-8 h-8 text-black" />
        </div>
      )}

      <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
        <SidebarFilters /> {/* You can customize this later for admin-specific filters */}

        <main className="md:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Your Posted Jobs</h2>
            <a
              href="/post-job"
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              + Post New Job
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.length === 0 && !loading ? (
              <p className="text-gray-500 col-span-full">No jobs posted yet.</p>
            ) : (
              jobs.map((job) => <JobCard key={job.id} job={job} role={"ADMIN"} />)
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
