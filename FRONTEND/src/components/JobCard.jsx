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

    if (data.personalInfo?.firstName && data.personalInfo?.lastName && data.personalInfo?.dateOfBirth && data.personalInfo?.gender && data.personalInfo?.summary && data.personalInfo?.nationality && data.personalInfo.nationality) filledSections++;
    if (data.contactInfo?.email && data.contactInfo?.phone && data.contactInfo.address && data.contactInfo.city && data.contactInfo.state && data.contactInfo.zip && data.contactInfo.linkedIn && data.contactInfo.country) filledSections++;
    if ((data.experiences || []).length > 0) filledSections++;
    if ((data.educations || []).length > 0) filledSections++;
    if ((data.skills || []).length > 0) filledSections++;
    if (data.resume?.url) filledSections++;
    filledSections++;

    return Math.round((filledSections / totalSections) * 100);
  };

  const progress = calculateProgress();

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

        <div className="mt-4">
          {isApplicant && (
            <Link
              to={`/apply/${id}`}
              className="text-sm px-4 py-1.5 rounded-md hover:bg-gray-100 border border-gray-300 text-black"
            >
              {draft ? "Continue" : "Apply"}
            </Link>
          )}

          {isAdmin && (
            <div className="flex flex-col items-end gap-1 mt-4">
              <Link
                to={`/job/${id}/applications`}
                className="flex items-center text-sm text-gray-600 hover:underline hover:text-black"
                title="View Applicants"
              >
                <Users className="w-4 h-4 mr-1 cursor-pointer" />
                {applications.length} applicant
                {applications.length !== 1 && "s"}
              </Link>
            </div>
          )}
        </div>
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

      {draft && (
        <div className="w-full bg-gray-200 h-2 rounded mb-2">
          <div
            className="bg-black h-2 rounded"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      <div className="text-xs text-gray-500">Posted: {postedTime}</div>
    </div>
  );
};

export default JobCard;
