
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLoading } from "../context/LoadingContext";
import {
  ArrowLeft,
  Eye,
  Mail,
  Phone,
  MapPin,
  Calendar,
  User,
  Search,
} from "lucide-react";
import API from "../api/axios";
import ApplicationModal from "../components/ApplicationModal";

const getStatusColor = (status) => {
  switch (status) {
    case "PENDING_REVIEW":
      return "bg-yellow-100 text-yellow-800";
    case "SHORTLISTED":
      return "bg-green-100 text-green-800";
    case "INTERVIEW_SCHEDULED":
      return "bg-blue-100 text-blue-800";
    case "REJECTED":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const ApplicationsView = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const { setIsLoading } = useLoading();

  const fetchApplications = async () => {
    setIsLoading(true);
    try {
      const res = await API.get(`/applications/${jobId}`);
      setApplications(res.data);
    } catch (error) {
      console.error("Failed to fetch applications", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [jobId]);

  const filteredApps = applications.filter(
    (app) =>
      app.applicant?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.applicant?.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusUpdate = async (id, newStatus) => {
    setIsLoading(true);
    try {
      await API.patch(`/applications/${id}/status`, { status: newStatus });
      fetchApplications();
      setSelectedApp(null);
    } catch (err) {
      console.error("Error updating status", err);
    }
    finally{
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center text-sm text-purple-700 hover:underline"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-semibold text-gray-800 tracking-tight">
            Applications
          </h1>
        </div>

        {/* Search Box */}
        <div className="relative max-w-md mb-6">
          <Search className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search applicants..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Applications Table */}
        <div className="overflow-x-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-md border border-gray-200">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-purple-50 text-xs uppercase text-gray-500 tracking-wider">
              <tr>
                <th className="px-6 py-3">Applicant</th>
                <th className="px-6 py-3">Contact</th>
                <th className="px-6 py-3">Experience</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Applied</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredApps.map((app) => (
                <tr key={app.id} className="border-b hover:bg-purple-50/30">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-purple-700" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">
                          {app.applicant?.name || "N/A"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {app.experiences?.[0]?.jobTitle || "-"}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 space-y-1 text-sm">
                    <div className="flex items-center gap-1 text-gray-600">
                      <Mail className="w-3 h-3" />
                      {app.applicant?.email || "-"}
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <Phone className="w-3 h-3" />
                      {app.contactInfo?.phone || "-"}
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <MapPin className="w-3 h-3" />
                      {`${app.contactInfo?.city || "-"}, ${app.contactInfo?.country || ""}`}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <p>{app.experiences?.[0]?.jobTitle || "-"}</p>
                    <p className="text-xs text-gray-500">
                      {app.educations?.[0]?.degree || "-"}
                    </p>
                    <div className="flex gap-1 flex-wrap mt-1">
                      {(app.skills || []).slice(0, 3).map((skill, idx) => (
                        <span
                          key={`${skill.name}-${idx}`}
                          className="px-2 py-0.5 text-xs bg-purple-100 text-purple-700 rounded-md"
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(
                        app.status
                      )}`}
                    >
                      {app.status.replaceAll("_", " ")}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar className="w-3 h-3" />
                      {new Date(app.appliedAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className="text-purple-600 hover:text-purple-800 transition"
                      onClick={() => setSelectedApp(app)}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {!setIsLoading && filteredApps.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-10 text-center text-gray-400"
                  >
                    No applications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {selectedApp && (
          <ApplicationModal
            application={selectedApp}
            onClose={() => setSelectedApp(null)}
            onStatusChange={handleStatusUpdate}
          />
        )}
      </div>
    </div>
  );
};

export default ApplicationsView;
