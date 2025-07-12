import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import ApplyPage from "./pages/ApplyPage";
import PostJobs from "./pages/PostJobs";
import About from "./pages/About";
import JobApplicationsPage from "./pages/JobApplicationsPage";
import MyApplicationsPage from "./pages/MyApplicationsPage";

const App = () => {
  return (
    <div className="font-sans">
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
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
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
