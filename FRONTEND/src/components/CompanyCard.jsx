import { Building2, MapPin, Users } from "lucide-react";

const CompanyCard = ({ name, location, size, openings = 0, logo }) => {
  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-center">
      {/* Logo */}
      <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 shadow-md">
        {logo ? (
          <img
            src={logo}
            alt={`${name} Logo`}
            className="w-full h-full object-contain rounded-xl"
          />
        ) : (
          <Building2 className="w-10 h-10 text-white" />
        )}
      </div>

      {/* Company Name */}
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
        {name}
      </h3>

      {/* Location and Size */}
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 flex items-center justify-center gap-1">
        <MapPin className="w-4 h-4" />
        {location} • {size}
      </p>

      {/* Openings */}
      <p className="text-sm text-purple-700 dark:text-purple-400 font-medium flex items-center justify-center gap-1">
        <Users className="w-4 h-4" />
        {openings} Active Opening{openings !== 1 && "s"}
      </p>
    </div>
  );
};

export default CompanyCard;
