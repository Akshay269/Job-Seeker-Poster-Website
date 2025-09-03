import { useForm } from "react-hook-form";
import API from "../api/axios";
import useAuthStore from "../store/authStore";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { Eye, EyeOff, ArrowLeft, Briefcase, Users } from "lucide-react";
import seekerImage from "../assets/jobseeker.jpg";
import employerImage from "../assets/employer.jpg";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();
  const location = useLocation();

  const [role, setRole] = useState("APPLICANT");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (location.state?.role === "ADMIN") {
      setRole("ADMIN");
    }
  }, [location.state]);

  const onSubmit = async (data) => {
  
    try {
      const res = await API.post("/auth/login", { ...data, role });
      const { user, token } = res.data;

      if (!user.isVerified) {
        toast("Please verify your account to continue", { icon: "🔒" });
        navigate("/verify", {
          state: {
            email: user.email,
            role: user.role,
          },
        });
        return;
      }

      setAuth(user, token);
      toast.success(`Welcome back, ${user.name || user.email}`);

      if (user.role === "APPLICANT") navigate("/jobs");
      else if (user.role === "ADMIN") navigate("/dashboard");
      else navigate("/signin");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Left Image Panel */}
      <div className="hidden md:block md:w-1/2 h-full relative overflow-hidden">
        <img
          src={role === "APPLICANT" ? seekerImage : employerImage}
          alt="Login Visual"
          className="w-full h-full object-cover absolute inset-0 opacity-0 animate-fadeIn"
        />
      </div>

      {/* Right Login Panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-gray-50 overflow-y-auto">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <Link
                to="/"
                className="inline-flex items-center text-gray-600 hover:text-black mb-6 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>

              <h1 className="text-2xl font-bold text-black mb-2">
                Welcome Back
              </h1>
              <p className="text-gray-600">Sign in to your Anvaya account</p>
            </div>

            <div className="mb-6">
              <label className="text-black mb-3 block font-medium">
                I am a:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole("APPLICANT")}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 flex items-center justify-center space-x-2 ${
                    role === "APPLICANT"
                      ? "border-transparent bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                      : "border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50"
                  }`}
                >
                  <Briefcase className="w-4 h-4" />
                  <span className="text-sm font-medium">Job Seeker</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole("ADMIN")}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 flex items-center justify-center space-x-2 ${
                    role === "ADMIN"
                      ? "border-transparent bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                      : "border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50"
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span className="text-sm font-medium">Employer</span>
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="text-black block text-sm font-medium mb-1">
                  {role === "APPLICANT" ? "Email Address" : "Company Email"}
                </label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email format",
                    },
                  })}
                  className={input}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-black block text-sm font-medium mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: "Password is required",
                    })}
                    className={`${input} pr-10`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
            
                <Link
                  to="/forgot-password"
                  className="text-sm text-purple-600 hover:text-purple-700 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 shadow-lg hover:shadow-xl rounded-lg font-semibold transition-all duration-200 flex justify-center items-center cursor-pointer"
              >
              Sign in
              </button>

              <div className="text-center">
                <p className="text-gray-600">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-purple-600 font-medium hover:text-purple-700 hover:underline cursor-pointer"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const input =
  "w-full border border-gray-300 rounded-md px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-purple-500";

export default Login;
