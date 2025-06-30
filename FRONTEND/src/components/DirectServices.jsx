import React from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Users, Briefcase, TrendingUp } from "lucide-react";

const DirectServices = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl w-full">
        {/* Job Seekers Section */}
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 lg:p-10 border border-gray-200">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-black" />
            </div>
            <h2 className="text-3xl font-bold text-black mb-2">
              For Job Seekers
            </h2>
            <p className="text-gray-600">
              Discover opportunities that match your skills and ambitions
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Job title, keywords, or company"
                className={input + " pl-10"}
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Location"
                className={input + " pl-10"}
              />
            </div>
            <button className="w-full h-12 bg-black hover:bg-gray-800 text-white text-lg font-semibold rounded">
              Search Jobs
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-black">10K+</div>
              <div className="text-sm text-gray-600">Active Jobs</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-black">500+</div>
              <div className="text-sm text-gray-600">Companies</div>
            </div>
          </div>
        </div>

        {/* HR Recruiters Section */}
        <div className="bg-black rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 lg:p-10 border border-gray-800">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">
              For Recruiters
            </h2>
            <p className="text-gray-300">
              Find the perfect candidates for your open positions
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <button
              onClick={() => navigate("/post-job")}
              className="w-full h-12 bg-white hover:bg-gray-100 text-black text-lg font-semibold rounded"
            >
              Post a Job
            </button>
            <button
              onClick={() => navigate("/resumes")}
              className="w-full h-12 bg-gray-900 border border-gray-600 text-white hover:bg-gray-800 text-lg font-semibold rounded"
            >
              Browse Resumes
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="w-full h-12 bg-gray-900 border border-gray-600 text-white hover:bg-gray-800 text-lg font-semibold rounded"
            >
              Employer Dashboard
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="text-2xl font-bold text-white">50K+</div>
              <div className="text-sm text-gray-400">Candidates</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="text-2xl font-bold text-white">95%</div>
              <div className="text-sm text-gray-400">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

const input =
  "w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black text-base";

export default DirectServices;
