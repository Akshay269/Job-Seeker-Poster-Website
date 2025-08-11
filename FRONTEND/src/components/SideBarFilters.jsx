import { useState, useEffect } from "react";

const SidebarFilters = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    title: "",
    location: "",
    jobType: "",
    experienceLevel: "",
  });

  const [debouncedFilters, setDebouncedFilters] = useState(filters);

  // Handle change for inputs/selects
  const handleChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Reset filters
  const clearFilters = () => {
    setFilters({
      title: "",
      location: "",
      jobType: "",
      experienceLevel: "",
    });
  };

  // Debounce effect (500ms delay)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFilters(filters);
    }, 500);
    return () => clearTimeout(handler);
  }, [filters]);

  // Notify parent when debounced filters change
  useEffect(() => {
    onFilterChange(debouncedFilters);
  }, [debouncedFilters, onFilterChange]);

  return (
    <div className="space-y-4 bg-gray-900 p-4 rounded-lg shadow-md">
      <input
        name="title"
        placeholder="Search by title"
        value={filters.title}
        onChange={handleChange}
        className="w-full p-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <input
        name="location"
        placeholder="Location"
        value={filters.location}
        onChange={handleChange}
        className="w-full p-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <select
        name="jobType"
        value={filters.jobType}
        onChange={handleChange}
        className="w-full p-2 rounded bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        <option value="">All Job Types</option>
        <option value="Full-time">Full-time</option>
        <option value="Part-time">Part-time</option>
        <option value="Internship">Internship</option>
        <option value="Contract">Contract</option>
      </select>
      <select
        name="experienceLevel"
        value={filters.experienceLevel}
        onChange={handleChange}
        className="w-full p-2 rounded bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        <option value="">All Experience Levels</option>
        <option value="Entry">Entry</option>
        <option value="Mid">Mid</option>
        <option value="Senior">Senior</option>
      </select>

      {/* Clear Filters Button */}
      <button
        onClick={clearFilters}
        className="w-full py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded transition"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default SidebarFilters;
