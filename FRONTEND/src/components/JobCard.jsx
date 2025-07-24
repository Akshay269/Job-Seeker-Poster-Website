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
    benefits,
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
    <div className="bg-white backdrop-blur-sm border border-gray-200 rounded-2xl p-5 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group cursor-pointer h-full">
      <div className="flex flex-col justify-between h-full">
        {/* Top content block */}
        <div>
          {/* Header */}
          <div className="flex items-start justify-between mb-2">
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
                <>
                  <Link
                    to={`/job/${id}/details`}
                    className="flex items-center text-sm text-gray-600 hover:text-purple-700 transition gap-2"
                    title="View Job Details"
                  >
                    View Details
                    <Briefcase className="w-5 h-5 text-orange-400" />
                  </Link>
                  {applications?.length > 0 && (
                    <Link
                      to={`/job/${id}/applications`}
                      className="flex items-center text-sm text-gray-600 hover:text-purple-700 transition gap-2"
                      title="View Applications"
                    >
                      View Applications
                      <Users className="w-5 h-5 text-orange-400" />
                    </Link>
                  )}
                </>
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
              <span>{jobType}</span>
            </div>
            <div className="flex items-center space-x-1">
              <DollarSign className="w-4 h-4" />
              <span>{salaryRange}</span>
            </div>
          </div>

          {/* Requirements */}
          {requirements?.length > 0 && (
            <div className="mb-2">
              <div className="flex items-center space-x-2 text-sm text-purple-700 font-medium mb-1">
                <ListChecks className="w-4 h-4" />
                <span>Requirements:</span>
              </div>
              <span>{requirements}</span>
            </div>
          )}

          {/* Benefits */}
          {benefits?.length > 0 && (
            <div className="mb-2">
              <div className="flex items-center space-x-2 text-sm text-pink-600 font-medium mb-1">
                <Gift className="w-4 h-4" />
                <span>Benefits:</span>
              </div>
              <span>{benefits}</span>
            </div>
          )}

          {/* Draft Progress */}
          {draft && (
            <div className="w-full bg-gray-200 h-2 rounded-full mb-2">
              <div
                className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>

        {/* Footer pinned to bottom */}
        <div className="text-xs text-gray-500 mt-auto pt-2">
          Posted: {postedTime}
        </div>
      </div>
    </div>
  );
};

export default JobCard;
