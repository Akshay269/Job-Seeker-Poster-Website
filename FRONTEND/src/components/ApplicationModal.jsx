import { X } from "lucide-react";
import { AnimatePresence } from "framer-motion";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const ApplicationModal = ({ application, onClose, onStatusChange }) => {
  if (!application) return null; // safety check

  const safeStatus = application.status?.replaceAll("_", " ") || "N/A";

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          key="modal"
          className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl max-w-lg w-full p-6 border border-purple-100"
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 40 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
              {application.applicant?.name || "Applicant"}
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-purple-100 transition"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="space-y-3 text-gray-700">
            <p>
              <strong>Email:</strong> {application.applicant?.email || "N/A"}
            </p>
            <p>
              <strong>Phone:</strong> {application.contactInfo?.phone || "N/A"}
            </p>
            <p>
              <strong>City:</strong> {application.contactInfo?.city || "-"},{" "}
              {application.contactInfo?.country || ""}
            </p>
            <p>
              <strong>Status:</strong> {safeStatus}
            </p>
          </div>

          {/* Actions */}
          <div className="mt-6 flex justify-end gap-2">
            <button
              onClick={() => onStatusChange(application.id, "SHORTLISTED")}
              className="px-4 py-2 rounded-xl bg-green-100 text-green-700 hover:bg-green-200 transition"
            >
              Shortlist
            </button>
            <button
              onClick={() =>
                onStatusChange(application.id, "INTERVIEW_SCHEDULED")
              }
              className="px-4 py-2 rounded-xl bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
            >
              Schedule Interview
            </button>
            <button
              onClick={() => onStatusChange(application.id, "REJECTED")}
              className="px-4 py-2 rounded-xl bg-red-100 text-red-700 hover:bg-red-200 transition"
            >
              Reject
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ApplicationModal;
