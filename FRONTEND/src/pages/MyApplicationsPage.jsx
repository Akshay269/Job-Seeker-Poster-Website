import { useEffect, useState } from "react";
import { Search, Eye, Download } from "lucide-react";
import { format } from "date-fns";
import API from "../api/axios";
import useAuthStore from "../store/authStore";
import { useLoading } from "../context/LoadingContext";
import { toast } from "react-hot-toast";

const MyApplications = () => {
  const { user } = useAuthStore();
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { setIsLoading } = useLoading();
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
       setIsLoading(true);
      if (!user?.id) return;
      try {
        const res = await API.get(`/applications/user/${user.id}`);
        setApplications(res.data);
      } catch (err) {
        console.error("Failed to fetch applications", err);
        toast.error("Failed to fetch applications.");
      } finally {
         setIsLoading(false);
      }
    };
    fetchApplications();
  }, [user]);

  const getStatusBadge = (status) => {
    const base = "px-2 py-1 text-xs rounded";
    const styles = {
      PENDING_REVIEW: "bg-yellow-100 text-yellow-800",
      SHORTLISTED: "bg-blue-100 text-blue-800",
      INTERVIEW_SCHEDULED: "bg-green-100 text-green-800",
      REJECTED: "bg-red-100 text-red-800",
      HIRED: "bg-black text-white"
    };
    return <span className={`${base} ${styles[status] || "bg-gray-100 text-gray-800"}`}>{status.replace("_", " ")}</span>;
  };

  const filtered = applications.filter((app) => {
    const matchesSearch =
      app.job?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.job?.companyName?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || app.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
  

      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-gray-900">My Applications</h1>
        <p className="text-gray-600 mb-6">Track and manage your job applications</p>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by job title or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-48 border border-gray-300 rounded px-4 py-2 text-sm"
          >
            <option value="all">All Statuses</option>
            <option value="PENDING_REVIEW">Pending Review</option>
            <option value="SHORTLISTED">Shortlisted</option>
            <option value="INTERVIEW_SCHEDULED">Interview Scheduled</option>
            <option value="REJECTED">Rejected</option>
            <option value="HIRED">Hired</option>
          </select>
        </div>

        {/* Applications Table */}
        <div className="overflow-x-auto bg-white border rounded-lg shadow-sm">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-gray-700 font-medium">Job</th>
                <th className="px-4 py-3 text-left text-gray-700 font-medium">Company</th>
                <th className="px-4 py-3 text-left text-gray-700 font-medium">Status</th>
                <th className="px-4 py-3 text-left text-gray-700 font-medium">Applied</th>
                <th className="px-4 py-3 text-right text-gray-700 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((app) => (
                <tr key={app.id} className="border-t">
                  <td className="px-4 py-3">{app.job?.title}</td>
                  <td className="px-4 py-3">{app.job?.companyName}</td>
                  <td className="px-4 py-3">{getStatusBadge(app.status)}</td>
                  <td className="px-4 py-3">{format(new Date(app.appliedAt), "dd MMM yyyy")}</td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button onClick={() => setSelected(app)} className="text-gray-600 hover:text-black">
                      <Eye className="w-4 h-4 inline" />
                    </button>
                    {app.resume && (
                      <a
                        href={app.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-black"
                      >
                        <Download className="w-4 h-4 inline" />
                      </a>
                    )}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && !setIsLoading && (
                <tr>
                  <td colSpan={5} className="px-4 py-4 text-center text-gray-500">
                    No applications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {selected && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white max-w-xl w-full rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">
              <div className="p-6 border-b flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold">{selected.job?.title}</h3>
                  <p className="text-sm text-gray-600">{selected.job?.companyName}</p>
                </div>
                <button onClick={() => setSelected(null)} className="text-gray-600 hover:text-black text-xl">
                  ×
                </button>
              </div>
              <div className="p-6 space-y-4 text-sm text-gray-700">
                <div>
                  <strong>Status:</strong> {getStatusBadge(selected.status)}
                </div>
                <div>
                  <strong>Applied On:</strong>{" "}
                  {format(new Date(selected.appliedAt), "dd MMM yyyy")}
                </div>
                <div>
                  <strong>Resume:</strong>{" "}
                  <a
                    href={selected.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline ml-1"
                  >
                    View Resume
                  </a>
                </div>
                {selected.coverLetter && (
                  <div>
                    <strong>Cover Letter:</strong>{" "}
                    <a
                      href={selected.coverLetter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline ml-1"
                    >
                      View Cover Letter
                    </a>
                  </div>
                )}
                {selected.skills?.length > 0 && (
                  <div>
                    <strong>Skills:</strong>{" "}
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selected.skills.map((s, i) => (
                        <span key={i} className="bg-gray-100 px-2 py-1 text-xs rounded">
                          {s.name || s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="p-4 flex justify-end border-t">
                <button
                  onClick={() => setSelected(null)}
                  className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplications;
