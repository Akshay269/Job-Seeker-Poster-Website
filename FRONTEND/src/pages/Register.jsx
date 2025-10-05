import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";

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
    console.log(data);
    navigate("/verifyi");
    // try {
    //   // await API.post("/auth/register", { ...data, role });
    //   toast.success("Registration successful. Please login.");
    //   setTimeout(
    //     () =>
    //       navigate("/verify", {
    //         state: {
    //           email: data.email,
    //           role,
    //         },
    //       }),
    //     500
    //   );
    // } catch (err) {
    //   toast.error(err?.response?.data?.message || "Registration failed");
    // }
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
              Create Account
            </h1>
            <p className="text-gray-400 text-sm">
              Join us and start your journey
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="text-white text-sm font-medium mb-2 block">Username</label>
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
                <p className="text-red-500 text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-white text-sm font-medium mb-2 block">Email Address</label>
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
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="text-white text-sm font-medium mb-2 block">Password</label>
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
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-white text-sm font-medium mb-2 block">Confirm Password</label>
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
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div>
              <label className="flex items-start gap-2 text-sm text-gray-400">
                <input
                  type="checkbox"
                  {...register("terms", {
                    required:
                      "You must agree to the Terms and Privacy Policy",
                  })}
                  className="mt-1"
                />
                I agree to the{" "}
                <a href="#" className="underline text-blue-500">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="underline text-blue-500">
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
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition cursor-pointer"
            >
              Register
            </button>

            <p className="text-center text-sm text-gray-400 mt-6">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="font-medium text-blue-500 hover:text-blue-400 hover:underline cursor-pointer"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

const input =
  "w-full border border-gray-700 bg-gray-800 text-white rounded-md px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500";

export default Register;
