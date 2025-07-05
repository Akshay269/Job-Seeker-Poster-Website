import { useForm } from "react-hook-form";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [role, setRole] = useState("APPLICANT");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await API.post("/auth/register", { ...data, role });
      toast.success("Registration successful. Please login.");
      setTimeout(() => navigate("/signin"), 800);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 pt-10 pb-10 relative">
      {/* Spinner Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-50 flex items-center justify-center">
          <Spinner className="w-8 h-8 text-black" />
        </div>
      )}

      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl relative z-10">
        <Link
          to="/"
          className="text-gray-500 text-sm mb-4 inline-block hover:underline"
        >
          ← Back to Home
        </Link>

        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-black text-white rounded-lg flex items-center justify-center text-lg font-bold">
            JP
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center text-black mb-1">
          Create Account
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Join JobPortal and start your journey
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

          {/* Name Fields */}
          {role === "APPLICANT" ? (
            <div className="flex gap-2">
              <div className="w-1/2">
                <label className="text-sm">First Name</label>
                <input
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                  placeholder="John"
                  className={input}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div className="w-1/2">
                <label className="text-sm">Last Name</label>
                <input
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                  placeholder="Doe"
                  className={input}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div>
              <label className="text-sm">Company Name</label>
              <input
                {...register("companyName", {
                  required: "Company name is required",
                })}
                placeholder="Acme Inc."
                className={input}
              />
              {errors.companyName && (
                <p className="text-red-500 text-sm">
                  {errors.companyName.message}
                </p>
              )}
            </div>
          )}

          {/* Email */}
          <div>
            <label className="text-sm">Email Address</label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
              placeholder="john@example.com"
              className={input}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-sm">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                placeholder="Create a password"
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
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                placeholder="Confirm your password"
                className={`${input} pr-10`}
              />
              <div
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Terms */}
          <div>
            <label className="text-sm flex items-start gap-2">
              <input
                type="checkbox"
                {...register("terms", {
                  required: "You must agree to the Terms and Privacy Policy",
                })}
                className="mt-1"
              />
              I agree to the{" "}
              <a href="#" className="underline text-black">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="underline text-black">
                Privacy Policy
              </a>
            </label>
            {errors.terms && (
              <p className="text-red-500 text-sm mt-1">
                {errors.terms.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 bg-black text-white rounded-lg text-lg font-semibold hover:bg-gray-900 transition"
          >
            {loading ? (
              <Spinner className="text-white w-4 h-4" />
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="font-semibold text-black hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

const input =
  "w-full border border-gray-300 rounded-md px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-black";

export default Register;
