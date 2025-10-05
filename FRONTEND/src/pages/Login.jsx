import { useForm } from "react-hook-form";
import API from "../api/axios";
import useAuthStore from "../store/authStore";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      const res = await API.post("/auth/login", data);
      const { user, token } = res.data;

      if (!user.isVerified) {
        toast("Please verify your account to continue", { icon: "🔒" });
        navigate("/verify", {
          state: {
            email: user.email,
          },
        });
        return;
      }

      setAuth(user, token);
      toast.success(`Welcome back, ${user.name || user.email}`);

      navigate("/jobs");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-6 py-12">
      <div className="w-full max-w-md">
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-8">
          <div className="text-center mb-8">
            <Link
              to="/"
              className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>

            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-400">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="text-white block text-sm font-medium mb-2">Email</label>
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
              <label className="text-white block text-sm font-medium mb-2">
                Password
              </label>
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
                  className={`${input} pr-10`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
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

            <div className="flex items-center justify-end">
              <Link
                to="/forgot-password"
                className="text-sm text-blue-500 hover:text-blue-400 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition cursor-pointer"
            >
              Sign in
            </button>

            <div className="text-center">
              <p className="text-gray-400">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-blue-500 font-medium hover:text-blue-400 hover:underline cursor-pointer"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const input =
  "w-full border border-gray-700 bg-gray-800 text-white rounded-md px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500";

export default Login;
