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
   <div className="bg-white backdrop-blur-sm border border-gray-200 rounded-xl p-3 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-300 group cursor-pointer h-full">
  <div className="flex flex-col justify-between h-full">
    {/* Header */}
    <div className="flex items-start justify-between mb-1">
      <div className="flex items-center space-x-2">
        <div className="w-9 h-9 rounded-md bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow">
          {companyIcon ? (
            <img
              src={companyIcon}
              alt="Company Logo"
              className="w-10 h-10 rounded-md object-cover border"
            />
          ) : (
            <Building2 className="w-5 h-5 text-white" />
          )}
        </div>
        <div>
          <h3 className="text-base font-semibold text-gray-900 group-hover:text-purple-700">
            {title}
          </h3>
          <p className="text-gray-600 text-xs">{companyName}</p>
        </div>
      </div>

      {(isApplicant || !role) && (
        <Link
          to={`/apply/${id}`}
          className="px-3 py-1 text-xs font-medium border border-gray-300 text-black rounded-md hover:bg-purple-100 transition"
        >
          {draft ? "Continue" : "Apply"}
        </Link>
      )}
      {isAdmin && (
        <div className="flex items-center space-x-1">
          <Link to={`/job/${id}/details`} title="Details">
            <Briefcase className="w-5 h-5 text-orange-400" />
          </Link>
          <Link to={`/job/${id}/applications`} title="Applications">
            <Users className="w-5 h-5 text-orange-400" />
          </Link>
        </div>
      )}
    </div>

    {/* Tags */}
    <div className="flex items-center space-x-3 text-xs text-gray-600 mb-2">
      <div className="flex items-center gap-2">
        <MapPin className="w-4 h-4" />
        <span>{location}</span>
      </div>
      <div className="flex items-center gap-2">
        <Clock className="w-4 h-4" />
        <span>{jobType}</span>
      </div>
      <div className="flex items-center gap-2">
        <DollarSign className="w-4 h-4" />
        <span>{salaryRange}</span>
      </div>
    </div>

    {/* Requirements */}
    {requirements && (
      <div className="mb-1">
        <div className="flex items-center gap-2 text-xs text-purple-700 font-medium">
          <ListChecks className="w-4 h-4" />
          <span>Requirements:</span>
        </div>
        <p className="text-sm text-black">{requirements}</p>
      </div>
    )}

    {/* Draft Progress */}
    {draft && (
      <div className="w-full bg-gray-200 h-1.5 rounded-full mb-1">
        <div
          className="bg-gradient-to-r from-purple-600 to-pink-600 h-1.5 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    )}

    {/* Footer */}
    <div className="text-[11px] text-gray-500 mt-1">Posted: {postedTime}</div>
  </div>
</div>

  );
};

export default JobCard;
