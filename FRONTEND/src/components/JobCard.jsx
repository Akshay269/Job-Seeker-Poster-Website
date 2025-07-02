import { MapPin, Clock, DollarSign, Building2 } from "lucide-react";
import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  if (!job) return null;
  const {
    id,
    title,
    companyName,
    location,
    type,
    salary,
    postedTime,
    tags = [],
  } = job;
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-black transition-all duration-300 cursor-pointer group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-black group-hover:text-gray-700 transition-colors">
              {title}
            </h3>
            <p className="text-gray-600">{companyName}</p>
          </div>
        </div>
        <Link to={`/apply/${id}`}>
          <button className="text-sm px-4 py-1.5 rounded-md hover:bg-gray-100 border border-gray-300 text-black">
            Apply
          </button>
        </Link>
      </div>

      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
        <div className="flex items-center space-x-1">
          <MapPin className="w-4 h-4" />
          <span>{location}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Clock className="w-4 h-4" />
          <span>{type}</span>
        </div>
        <div className="flex items-center space-x-1">
          <DollarSign className="w-4 h-4" />
          <span>{salary}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="inline-block px-2 py-1 text-xs bg-gray-100 text-black rounded hover:bg-gray-200"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="text-xs text-gray-500">Posted {postedTime}</div>
    </div>
  );
};

export default JobCard;
