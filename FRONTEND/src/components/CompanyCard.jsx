import { Building2, MapPin, Users } from "lucide-react";

const CompanyCard = ({ name, industry, location, employees, openJobs, description }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-black transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-black">{name}</h3>
            <p className="text-gray-600">{industry}</p>
          </div>
        </div>
        <button className="text-sm px-4 py-1.5 rounded-md border border-gray-300 text-black hover:bg-gray-50">
          Follow
        </button>
      </div>

      <p className="text-gray-600 mb-4 text-sm leading-relaxed">{description}</p>

      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
        <div className="flex items-center space-x-1">
          <MapPin className="w-4 h-4" />
          <span>{location}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Users className="w-4 h-4" />
          <span>{employees}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-black font-semibold">{openJobs} open positions</span>
        <button className="text-sm px-4 py-2 rounded-md bg-black text-white hover:bg-gray-800">
          View Jobs
        </button>
      </div>
    </div>
  );
};

export default CompanyCard;
