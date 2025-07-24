import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import API from "../api/axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useLoading } from "../context/LoadingContext";

const Verify = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { isLoading,setIsLoading } = useLoading();
  const [resendLoading, setResendLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (!state?.email || !state?.role) {
      toast.error("Missing verification info. Please register again.");
      navigate("/register");
    }
  }, [state, navigate]);

  // Timer countdown
  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendTimer]);

  const onSubmit = async (data) => {
     setIsLoading(true);
    try {
      await API.post("/auth/verify", {
        email: state.email,
        otp: data.otp.trim(),
      });
      toast.success("Account verified successfully!");
      setTimeout(() => {
        navigate("/signin");
      }, 500);
      
    } catch (err) {
      toast.error(err?.response?.data?.message || "Verification failed");
    } finally {
       setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setResendLoading(true);
    try {
      await API.post("/auth/resend-otp", {
        email: state.email,
        role: state.role,
      });
      toast.success("OTP resent successfully!");
      setResendTimer(60); // Disable button for 60 seconds
    } catch {
      toast.error("Failed to resend OTP");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-purple-50 px-4">
      <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-purple-700 mb-4 text-center">
          Verify Your Account
        </h1>
        <p className="text-sm text-gray-600 text-center mb-6">
          Please enter the OTP sent to <strong>{state?.email}</strong>
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">OTP</label>
            <input
              type="text"
              maxLength={6}
              {...register("otp", {
                required: "OTP is required",
                pattern: {
                  value: /^\d{6}$/,
                  message: "Enter a valid 6-digit OTP",
                },
              })}
              placeholder="123456"
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.otp && (
              <p className="text-red-500 text-sm mt-1">{errors.otp.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-xl font-semibold transition-all duration-200"
          >
            Verify
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={handleResendOTP}
            disabled={resendTimer > 0 || resendLoading}
            className={`text-sm font-medium ${
              resendTimer > 0 || resendLoading
                ? "text-gray-400 cursor-not-allowed"
                : "text-purple-600 hover:underline"
            }`}
          >
            {resendTimer > 0
              ? `Resend OTP in ${resendTimer}s`
              : resendLoading
              ? "Resending..."
              : "Resend OTP"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Verify;
