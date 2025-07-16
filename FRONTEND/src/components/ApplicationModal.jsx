import { X } from "lucide-react";
import { useState } from "react";

const statuses = [
  "Pending Review",
  "Shortlisted",
  "Interview Scheduled",
  "Rejected",
];

const ApplicationModal = ({ application, onClose, onStatusChange }) => {
  const [newStatus, setNewStatus] = useState(application.status);

  const handleStatusUpdate = () => {
    if (newStatus !== application.status) {
      onStatusChange(application.id, newStatus);
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-semibold mb-4">Application Details</h2>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-1 text-sm text-gray-700">
          <div>
            <p className="text-gray-500 font-medium">Name</p>
            <p>{application.applicant?.name}</p>
          </div>
          <div>
            <p className="text-gray-500 font-medium">Email</p>
            <p>{application.applicant?.email}</p>
          </div>
          <div>
            <p className="text-gray-500 font-medium">Phone</p>
            <p>{application.contactInfo?.phone}</p>
          </div>
          <div>
            <p className="text-gray-500 font-medium">Location</p>
            <p>{`${application.contactInfo?.city}, ${application.contactInfo?.country}`}</p>
          </div>
          <div>
            <p className="text-gray-500 font-medium">Education</p>
            {application.educations?.map((edu, i) => (
              <p key={i}>{`${edu.degree} - ${edu.institution}`}</p>
            ))}
          </div>
          <div>
            <p className="text-gray-500 font-medium">Experience</p>
            {application.experiences?.map((exp, i) => (
              <p key={i}>{`${exp.jobTitle} at ${exp.company}`}</p>
            ))}
          </div>
          <div>
            <p className="text-gray-500 font-medium">Skills</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {application.skills?.map((skill, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 bg-gray-200 text-xs rounded"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-gray-500 font-medium">Documents</p>
            <div className="mt-2 space-y-2 text-sm text-blue-600 underline">
              {application.resume && (
                <a
                  href={application.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  Resume
                </a>
              )}
              {application.coverLetter && (
                <a
                  href={application.coverLetter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  Cover Letter
                </a>
              )}
              {application.portfolio && (
                <a
                  href={application.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  Portfolio
                </a>
              )}
              {(application.otherFiles || []).length > 0 && (
                <div className="text-gray-700">
                  <p className="text-sm font-medium">Other Documents:</p>
                  <ul className="list-disc pl-5">
                    {application.otherFiles.map((file, index) => (
                      <li key={index}>
                        <a
                          href={file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          Other File {index + 1}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div>
            <p className="text-gray-500 font-medium">Current Status</p>
            <select
              className="mt-1 w-full border px-3 py-2 rounded"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleStatusUpdate}
            className="px-4 py-2 bg-blue-600 text-white rounded text-sm"
          >
            Update Status
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationModal;
