import { useForm } from "react-hook-form";
import API from "../api/axios";
import useAuthStore from "../store/authStore";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("isSubmitting changed:", isSubmitting);
  }, [isSubmitting]);

  const onSubmit = async (data) => {
    try {
      const res = await API.post("/auth/login", data);
      const { user, token } = res.data;
      setAuth(user, token);
      toast.success(`Welcome back, ${user.name || user.email}`);
      if (user.role === "APPLICANT") {
        setTimeout(() => navigate("/jobs"), 800);
      } else if (user.role === "ADMIN") {
        setTimeout(() => navigate("/dashboard"), 800);
      } else {
        setTimeout(() => navigate("/"), 800);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Login to Job Portal
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-md space-y-4"
      >
        <select
          {...register("role", { required: "Role is required" })}
          className={input}
          defaultValue=""
        >
          <option value="" disabled>
            Select Role
          </option>
          <option value="APPLICANT">Applicant</option>
          <option value="ADMIN">HR / Job Poster</option>
        </select>
        {errors.role && <p className="text-red-500">{errors.role.message}</p>}

        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email format",
            },
          })}
          placeholder="Email"
          className={input}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <input
          type="password"
          {...register("password", {
            required: "Password is required",
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message:
                "Password must be at least 8 characters, include uppercase, lowercase, number, and special character",
            },
          })}
          placeholder="Password"
          className={input}
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {isSubmitting ? (
            <>
              <Spinner className="text-white w-4 h-4" />
            </>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
};

const input =
  "w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300";

export default Login;
