import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";                  
import Register from "./pages/Register";   
import Jobs from "./pages/Jobs";           
import Dashboard from "./pages/Dashboard";
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";

const App = () => {
  return (
      <div className="font-sans">
      <Toaster position="top-center" reverseOrder={false} />
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Login/>}/>
          <Route path="/signup" element={<Register />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/dashboard" element={ <Dashboard />} />
        </Routes>

        <Footer />
      </div>
  );
};

export default App;
