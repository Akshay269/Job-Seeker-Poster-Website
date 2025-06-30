
import { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import SidebarFilters from "../components/SideBarFilters";
import API from "../api/axios";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await API.get("/jobs");
        setJobs(res.data);
      } catch (err) {
        console.error("Failed to fetch jobs", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
      
      
      {/* <aside className="md:col-span-1 bg-white p-4 rounded shadow space-y-4">
        <h2 className="text-xl font-semibold">Filters</h2>

        <div>
          <label className="font-medium">Job Type</label>
          <div className="space-y-1 mt-2">
            <label><input type="checkbox" className="mr-2" />Full-Time</label>
            <label><input type="checkbox" className="mr-2" />Part-Time</label>
            <label><input type="checkbox" className="mr-2" />Internship</label>
            <label><input type="checkbox" className="mr-2" />Remote</label>
          </div>
        </div>

        <div>
          <label className="font-medium">Location</label>
          <input type="text" className="w-full border p-2 rounded" placeholder="e.g., Bengaluru" />
        </div>
      </aside> */}
      <SidebarFilters/>

     
      <main className="md:col-span-3 space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Available Jobs</h2>
        
        {loading ? (
          <p>Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <p>No jobs found.</p>
        ) : (
          jobs.map((job) => <JobCard key={job.id} job={job} />)
        )}
      </main>
    </div>
  );
};

export default Jobs;
