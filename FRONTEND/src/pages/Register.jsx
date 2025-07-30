import { useForm } from "react-hook-form";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { useLoading } from "../context/LoadingContext";
import { useState } from "react";
import { Eye, EyeOff, ArrowLeft, Briefcase, Users } from "lucide-react";
import { toast } from "react-hot-toast";

import seekerImage from "../assets/jobseeker2.jpg";
import employerImage from "../assets/employer2.jpg";

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
    const { isLoading, setIsLoading } = useLoading();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await API.post("/auth/register", { ...data, role });
      toast.success("Registration successful. Please login.");
      setTimeout(
        () =>
          navigate("/verify", {
            state: {
              email: data.email,
              role,
            },
          }),
        500
      );
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration failed");
    } finally {
     setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Left Register Panel */}
      <div className="hidden md:block md:w-1/2 h-full relative transition-all duration-500">
        <img
          src={role === "APPLICANT" ? seekerImage : employerImage}
          alt="Register Visual"
          className="w-full h-full object-cover transition-opacity duration-500"
        />
      </div>

      {/* Right Image Panel */}

      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-gradient-to-br from-white via-gray-50 to-purple-50 overflow-y-auto">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <div className="text-center mb-8">
              <Link
                to="/"
                className="inline-flex items-center text-gray-600 hover:text-black mb-6 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>

              <h1 className="text-3xl font-extrabold text-purple-700 mb-2">
                Create Account
              </h1>
              <p className="text-gray-600 text-sm">
                Join Anvaya and start your journey
              </p>
            </div>

            {/* Role Buttons */}
            <div className="mb-6">
              <label className="text-black mb-3 block font-semibold">
                I am a:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole("APPLICANT")}
                  className={`p-3 rounded-xl border-2 transition-all duration-200 flex items-center justify-center space-x-2 font-medium text-sm shadow-sm ${
                    role === "APPLICANT"
                      ? "border-transparent bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                      : "border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50"
                  }`}
                >
                  <Briefcase className="w-4 h-4" />
                  <span>Job Seeker</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole("ADMIN")}
                  className={`p-3 rounded-xl border-2 transition-all duration-200 flex items-center justify-center space-x-2 font-medium text-sm shadow-sm ${
                    role === "ADMIN"
                      ? "border-transparent bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                      : "border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50"
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>Employer</span>
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {role === "APPLICANT" ? (
                <div className="flex gap-2">
                  <div className="w-1/2">
                    <label className="text-sm font-medium">First Name</label>
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
                    <label className="text-sm font-medium">Last Name</label>
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
                  <label className="text-sm font-medium">Company Name</label>
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

              <div>
                <label className="text-sm font-medium">Email Address</label>
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

              <div>
                <label className="text-sm font-medium">Password</label>
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
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium">Confirm Password</label>
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
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <div>
                <label className="flex items-start gap-2 text-sm">
                  <input
                    type="checkbox"
                    {...register("terms", {
                      required:
                        "You must agree to the Terms and Privacy Policy",
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

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 shadow-lg hover:shadow-xl rounded-xl font-semibold transition-all duration-200 cursor-pointer"
              >
              Register
              </button>

              <p className="text-center text-sm text-gray-600 mt-6">
                Already have an account?{" "}
                <Link
                  to="/signin"
                  className="font-medium text-purple-600 hover:underline cursor-pointer"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const input =
  "w-full border border-gray-300 rounded-md px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-purple-500";

export default Register;
