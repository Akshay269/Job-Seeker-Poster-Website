import { useForm } from "react-hook-form";
import API from "../api/axios";
import useAuthStore from "../store/authStore";
import { useNavigate, Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();
  const [role, setRole] = useState("APPLICANT");
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      const res = await API.post("/auth/login", { ...data, role });
      const { user, token } = res.data;
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 pt-10 pb-10 ">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl">
        <Link
          to="/"
          className="text-gray-500 text-sm mb-6 inline-block hover:underline"
        >
          ← Back to Home
        </Link>

        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-black text-white rounded-lg flex items-center justify-center text-lg font-bold">
            JP
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center text-black mb-1">
          Welcome Back
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Sign in to your JobPortal account
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Role Toggle */}
          <div className="flex justify-center gap-2">
            <button
              type="button"
              onClick={() => setRole("APPLICANT")}
              className={`px-4 py-2 rounded-lg font-semibold text-sm border ${
                role === "APPLICANT"
                  ? "bg-black text-white"
                  : "bg-white text-black border-gray-300"
              }`}
            >
              Job Seeker
            </button>
            <button
              type="button"
              onClick={() => setRole("ADMIN")}
              className={`px-4 py-2 rounded-lg font-semibold text-sm border ${
                role === "ADMIN"
                  ? "bg-black text-white"
                  : "bg-white text-black border-gray-300"
              }`}
            >
              Employer
            </button>
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {role === "APPLICANT" ? "Email Address" : "Company Email Address"}
            </label>
            <div className="relative">
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })}
                placeholder="Enter your email"
                className={input}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                })}
                placeholder="Enter your password"
                className={`${input} pr-10`}
              />
              <div
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Remember me + Forgot password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4" />
              Remember me
            </label>
            <Link
              to="/forgot-password"
              className="text-gray-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-11 bg-black text-white rounded-lg text-lg font-semibold hover:bg-gray-900 transition"
          >
            {isSubmitting ? (
              <Spinner className="text-white w-4 h-4" />
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-black hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

const input =
  "w-full border border-gray-300 rounded-md px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-black";

export default Login;
