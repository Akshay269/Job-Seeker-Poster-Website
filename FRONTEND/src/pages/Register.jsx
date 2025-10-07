import { useForm } from "react-hook-form";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { toast } from "react-hot-toast";


import employerImage from "../assets/employer2.jpg";

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode:"onChange"
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = async (data) => {  
    try {
       await API.post("/auth/register", { ...data });
      toast.success("Registration successful. Please login.");
      setTimeout(
        () =>
          navigate("/verify", {
            state: {
              email: data.email,
            },
          }),
        500
      );
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Left Register Panel */}
      <div className="hidden md:block md:w-1/2 h-full relative transition-all duration-500">
        <img
          src={employerImage}
          alt="Register Visual"
          className="w-full h-full object-cover transition-opacity duration-500"
        />
      </div>

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
                Join Us and start your journey
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <div>
                <label className="text-sm font-medium">Username</label>
                <input
                  {...register("username", {
                    required: "Username is required",
                    minLength: {
                      value: 3,
                      message: "Username must be at least 3 characters",
                    },
                    maxLength: {
                      value: 20,
                      message: "Username must not exceed 20 characters",
                    },
                  })}
                  placeholder="John"
                  className={input}
                />
                {errors.username && (
                  <p className="text-red-500 text-sm">
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium">Email Address</label>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email address",
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
                      validate: {
                        hasNumber: (value) =>
                          /\d/.test(value) || "Password must contain a number",
                        hasUpper: (value) =>
                          /[A-Z]/.test(value) ||
                          "Password must contain an uppercase letter",
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
                     validate: (value, formValues) =>
              value === formValues.password || "Passwords do not match",
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

             <div className="flex justify-center">
              <button
                type="submit"
                className="w-1/2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 shadow-lg hover:shadow-xl rounded-xl font-semibold transition-all duration-200 cursor-pointer"
              >
                Register
              </button>
              </div>

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
