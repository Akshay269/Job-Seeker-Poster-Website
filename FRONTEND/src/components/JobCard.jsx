import { MapPin, Clock, DollarSign, Building2, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

const JobCard = ({ job, role, draft }) => {
  if (!job) return null;
  const {
    id,
    title,
    companyName,
    location,
    type,
    salary,
    createdAt,
    tags = [],
    applications = [],
  } = job;

  const isApplicant = role === "APPLICANT";
  const isAdmin = role === "ADMIN";

  const postedTime = createdAt
    ? formatDistanceToNow(new Date(createdAt), { addSuffix: true })
    : "recently";

  const calculateProgress = () => {
    if (!draft?.data) return null;
    const totalSections = 19;
    let filledSections = 0;
    const data = draft.data;

    if (
      data.personalInfo?.firstName &&
      data.personalInfo?.lastName &&
      data.personalInfo?.dateOfBirth &&
      data.personalInfo?.gender &&
      data.personalInfo?.summary &&
      data.personalInfo?.nationality
    )
      filledSections++;
    if (
      data.contactInfo?.email &&
      data.contactInfo?.phone &&
      data.contactInfo.address &&
      data.contactInfo.city &&
      data.contactInfo.state &&
      data.contactInfo.zip &&
      data.contactInfo.linkedIn &&
      data.contactInfo.country
    )
      filledSections++;
    if ((data.experiences || []).length > 0) filledSections++;
    if ((data.educations || []).length > 0) filledSections++;
    if ((data.skills || []).length > 0) filledSections++;
    if (data.resume?.url) filledSections++;
    filledSections++;

    return Math.round((filledSections / totalSections) * 100);
  };

  const progress = calculateProgress();

  return (
    <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group cursor-pointer">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-700 transition-colors">
              {title}
            </h3>
            <p className="text-gray-600 text-sm">{companyName}</p>
          </div>
        </div>

        <div>
          {isApplicant && (
            <Link
              to={`/apply/${id}`}
              className="inline-block px-4 py-1.5 text-sm font-medium border border-gray-300 text-black rounded-lg hover:bg-purple-100 transition"
            >
              {draft ? "Continue" : "Apply"}
            </Link>
          )}
          {isAdmin && (
            <Link
              to={`/job/${id}/applications`}
              className="flex items-center text-sm text-gray-600 hover:text-purple-700 transition"
              title="View Applicants"
            >
              <Users className="w-4 h-4 mr-1" />
              {applications.length} applicant
              {applications.length !== 1 && "s"}
            </Link>
          )}
        </div>
      </div>

      {/* Info Tags */}
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

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-700 font-medium"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Draft Progress */}
      {draft && (
        <div className="w-full bg-gray-200 h-2 rounded-full mb-2">
          <div
            className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Footer */}
      <div className="text-xs text-gray-500">Posted: {postedTime}</div>
    </div>
  );
};

export default JobCard;
