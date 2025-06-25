import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";                  
import Register from "./pages/Register";   
import Jobs from "./pages/Jobs";           
import Dashboard from "./pages/Dashboard";
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
      <div className="font-sans">
      <Toaster position="top-center" reverseOrder={false} />
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>

        <Footer />
      </div>
  );
};

export default App;
