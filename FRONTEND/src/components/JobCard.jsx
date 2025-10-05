import {
  MapPin,
  Clock,
  DollarSign,
  Building2,
  ListChecks,
  Briefcase,
  Gift,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

const JobCard = ({ job, role, draft }) => {
  if (!job) return null;
  const {
    id,
    title,
    companyName,
    location,
    jobType,
    salaryRange,
    createdAt,
    requirements,
    companyIcon
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
      filledSections += 6;
    if (
      data.contactInfo.email &&
      data.contactInfo.phone &&
      data.contactInfo.address &&
      data.contactInfo.city &&
      data.contactInfo.state &&
      data.contactInfo.zip &&
      data.contactInfo.country
    )
      filledSections += 7;
    if ((data.experiences || []).length > 0) filledSections++;
    if ((data.educations || []).length > 0) filledSections++;
    if ((data.skills || []).length > 0) filledSections++;
    if (data.resume?.url) filledSections++;
    filledSections++;

    return Math.round((filledSections / totalSections) * 100);
  };
  

  const progress = calculateProgress();

  return (
   <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 hover:border-gray-700 hover:bg-gray-800 transition-all duration-300 group cursor-pointer h-full">
  <div className="flex flex-col justify-between h-full">
    <div className="flex items-start justify-between mb-3">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow">
          {companyIcon ? (
            <img
              src={companyIcon}
              alt="Company Logo"
              className="w-10 h-10 rounded-lg object-cover"
            />
          ) : (
            <Building2 className="w-5 h-5 text-white" />
          )}
        </div>
        <div>
          <h3 className="text-base font-semibold text-white group-hover:text-blue-400">
            {title}
          </h3>
          <p className="text-gray-400 text-xs">{companyName}</p>
        </div>
      </div>

      {(isApplicant || !role) && (
        <Link
          to={`/apply/${id}`}
          className="px-3 py-1 text-xs font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          {draft ? "Continue" : "Apply"}
        </Link>
      )}
      {isAdmin && (
        <div className="flex items-center space-x-2">
          <Link to={`/job/${id}/details`} title="Details">
            <Briefcase className="w-5 h-5 text-blue-400 hover:text-blue-300" />
          </Link>
          <Link to={`/job/${id}/applications`} title="Applications">
            <Users className="w-5 h-5 text-blue-400 hover:text-blue-300" />
          </Link>
        </div>
      )}
    </div>

    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 mb-3">
      <div className="flex items-center gap-1">
        <MapPin className="w-3 h-3" />
        <span>{location}</span>
      </div>
      <div className="flex items-center gap-1">
        <Clock className="w-3 h-3" />
        <span>{jobType}</span>
      </div>
      <div className="flex items-center gap-1">
        <DollarSign className="w-3 h-3" />
        <span>{salaryRange}</span>
      </div>
    </div>

    {requirements && (
      <div className="mb-3">
        <div className="flex items-center gap-2 text-xs text-blue-400 font-medium mb-1">
          <ListChecks className="w-3 h-3" />
          <span>Requirements:</span>
        </div>
        <p className="text-sm text-gray-300 line-clamp-2">{requirements}</p>
      </div>
    )}

    {draft && (
      <div className="w-full bg-gray-800 h-1.5 rounded-full mb-2">
        <div
          className="bg-gradient-to-r from-blue-500 to-blue-600 h-1.5 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    )}

    <div className="text-xs text-gray-500 mt-auto">Posted: {postedTime}</div>
  </div>
</div>

  );
};

export default JobCard;
