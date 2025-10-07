import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";
import { Suspense, lazy } from "react";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPasswordPage from "./pages/ResetPassword";

import { useEffect } from "react";
import useAuthStore from "./store/authStore";

// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Jobs = lazy(() => import("./pages/Jobs"));
const ApplyPage = lazy(() => import("./pages/ApplyPage"));
const MyApplicationsPage = lazy(() => import("./pages/MyApplicationsPage"));
const PostJobs = lazy(() => import("./pages/PostJobs"));
const JobApplicationsPage = lazy(() => import("./pages/JobApplicationsPage"));
const JobDetailsPage = lazy(() => import("./pages/JobDetailsPage"));
const VerifyPage = lazy(() => import("./pages/VerifyPage"));

const App = () => {
  const { initAuth, isAuthLoaded } = useAuthStore();

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  // ✅ While auth state is being restored, show a loader (prevents flicker)
  if (!isAuthLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-300 text-lg">
        Checking session...
      </div>
    );
  }

  return (
    <div className="font-sans bg-black min-h-screen flex flex-col">
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />

      {/* Suspense fallback */}
      <Suspense
        fallback={
          <div className="p-4 text-center text-gray-400">Loading...</div>
        }
      >
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/signin"
              element={
                <ProtectedRoute guestOnly={true}>
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <ProtectedRoute guestOnly={true}>
                  <Register />
                </ProtectedRoute>
              }
            />
            <Route
              path="/verify"
              element={
                <ProtectedRoute guestOnly={true}>
                  <VerifyPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/forgot-password"
              element={
                <ProtectedRoute guestOnly={true}>
                  <ForgotPassword />
                </ProtectedRoute>
              }
            />

            <Route
              path="/reset-password/:token"
              element={
                <ProtectedRoute guestOnly={true}>
                  <ResetPasswordPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute requireAuth={true}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/jobs"
              element={
                <ProtectedRoute requireAuth={true}>
                  <Jobs />
                </ProtectedRoute>
              }
            />
            <Route
              path="/apply/:jobId"
              element={
                <ProtectedRoute requireAuth={true}>
                  <ApplyPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/myapplications"
              element={
                <ProtectedRoute requireAuth={true}>
                  <MyApplicationsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/post-job"
              element={
                <ProtectedRoute requireAuth={true}>
                  <PostJobs />
                </ProtectedRoute>
              }
            />
            <Route
              path="/job/:jobId/applications"
              element={
                <ProtectedRoute requireAuth={true}>
                  <JobApplicationsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/job/:jobId/details"
              element={
                <ProtectedRoute requireAuth={true}>
                  <JobDetailsPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Suspense>

      <Footer />
    </div>
  );
};

export default App;
