import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

const getStatusColor = (status) => {
  switch (status) {
    case "Under Review":
      return "bg-yellow-100 text-yellow-800";
    case "Shortlisted":
      return "bg-green-100 text-green-800";
    case "Interview Scheduled":
      return "bg-blue-100 text-blue-800";
    case "Rejected":
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await API.get(`/applications/${jobId}`);
        setApplications(res.data);
      } catch (error) {
        console.error("Failed to fetch applications", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [jobId]);

  const filteredApps = applications.filter(
    (app) =>
      app.applicant?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.applicant?.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center space-x-1 text-sm text-blue-600 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          <h1 className="text-2xl font-semibold text-gray-800">Applications</h1>
        </div>

        {/* Search Bar */}
        <div className="relative w-full max-w-md mb-6">
          <Search className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search applicants..."
            className="w-full pl-10 pr-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-full text-sm text-left text-gray-600">
            <thead className="text-xs text-gray-500 uppercase bg-gray-100">
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
                <tr key={app.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium text-black">
                          {app.applicant?.name || "N/A"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {app.previousRole || "-"}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 space-y-1 text-sm">
                    <div className="flex items-center gap-1">
                      <Mail className="w-3 h-3 text-gray-400" />
                      {app.applicant?.email || "-"}
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="w-3 h-3 text-gray-400" />
                      {app.phone || "-"}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      {app.location || "-"}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <p>{app.experience || "-"}</p>
                    <p className="text-xs text-gray-500">
                      {app.education || "-"}
                    </p>
                    <div className="flex gap-1 flex-wrap mt-1">
                      {(app.skills || []).slice(0, 3).map((skill, idx) => (
                        <span
                          key={`${skill.name}-${idx}`}
                          className="px-2 py-0.5 text-xs bg-gray-100 rounded-md"
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
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar className="w-3 h-3" />
                      {new Date(app.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-gray-500 hover:text-black">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {!loading && filteredApps.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No applications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ApplicationsView;
