import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";
import { Suspense, lazy } from "react";

// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const About = lazy(() => import("./pages/About"));
const Jobs = lazy(() => import("./pages/Jobs"));
const ApplyPage = lazy(() => import("./pages/ApplyPage"));
const MyApplicationsPage = lazy(() => import("./pages/MyApplicationsPage"));
const PostJobs = lazy(() => import("./pages/PostJobs"));
const JobApplicationsPage = lazy(() => import("./pages/JobApplicationsPage"));
const JobDetailsPage = lazy(() => import("./pages/JobDetailsPage"));
const VerifyPage = lazy(() => import("./pages/VerifyPage"));

const App = () => {
  return (
    <div className="font-sans">
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />

      {/* Suspense fallback */}
      <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/verify" element={<VerifyPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route
            path="/apply/:jobId"
            element={
              <ProtectedRoute requireAuth={true} role="APPLICANT">
                <ApplyPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/myapplications"
            element={
              <ProtectedRoute requireAuth={true} role="APPLICANT">
                <MyApplicationsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/post-job"
            element={
              <ProtectedRoute requireAuth={true} role="ADMIN">
                <PostJobs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/job/:jobId/applications"
            element={
              <ProtectedRoute requireAuth={true} role="ADMIN">
                <JobApplicationsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/job/:jobId/details"
            element={
              <ProtectedRoute requireAuth={true} role="ADMIN">
                <JobDetailsPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>

      <Footer />
    </div>
  );
};

export default App;
