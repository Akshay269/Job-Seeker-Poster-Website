import { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import SidebarFilters from "../components/SideBarFilters";
import API from "../api/axios";
import { Link } from "react-router-dom";
import {useLoading} from "../context/LoadingContext";

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const { setIsLoading } = useLoading();

  useEffect(() => {
    setIsLoading(true);
    const fetchAdminJobs = async () => {
      try {
        const res = await API.get("/jobs/postedjobs");
        setJobs(res.data);
      } catch (err) {
        console.error("Failed to fetch admin jobs", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdminJobs();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-black to-pink-900 text-white">
      

      <div className="px-4 py-8 max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
        <div className="md:col-span-1">
          <SidebarFilters />
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
            {jobs.length === 0 && !setIsLoading ? (
              <p className="text-gray-300 col-span-full text-center">
                No jobs posted yet.
              </p>
            ) : (
              jobs.map((job) => <JobCard key={job.id} job={job} role="ADMIN" />)
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
