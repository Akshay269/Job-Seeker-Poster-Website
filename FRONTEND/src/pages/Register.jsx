import { useForm } from "react-hook-form";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import {toast} from 'react-hot-toast';

const input =
  "w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300";

const Register = () => {
  const navigate = useNavigate();

  const {
    register: registerApplicant,
    handleSubmit: handleApplicantSubmit,
    formState: { errors: applicantErrors, isSubmitting: isSubmittingApplicant },
  } = useForm();

  const {
    register: registerHR,
    handleSubmit: handleHRSubmit,
    formState: { errors: hrErrors, isSubmitting: isSubmittingHR },
  } = useForm();

  const onApplicantSubmit = async (data) => {
    try {
    await API.post('/auth/register', { ...data, role: "APPLICANT" });
      toast.success('Registration successful. Please login.');
      navigate("/");
    } catch(err) {
      toast.error(err?.response?.data?.message || 'Registration failed');
    }
  };

  const onHRSubmit = async (data) => {
    try {
    await API.post('/auth/register', { ...data, role: "ADMIN" });
      toast.success('Registration successful. Please login.');
      navigate("/");
    } catch(err) {
      toast.error(err?.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Register to Job Portal
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl bg-white p-8 rounded-lg shadow">
        {/* Applicant Form */}
        <form
          onSubmit={handleApplicantSubmit(onApplicantSubmit)}
          className="space-y-4 border-r md:pr-8"
        >
          <h2 className="text-2xl font-semibold text-blue-700">Applicant</h2>

          <input
            {...registerApplicant("name", {
              required: "Full name is required",
            })}
            placeholder="Full Name"
            className={input}
          />
          {applicantErrors.name && (
            <p className="text-red-500">{applicantErrors.name.message}</p>
          )}

          <input
            {...registerApplicant("email", { required: "Email is required" })}
            placeholder="Email"
            className={input}
          />
          {applicantErrors.email && (
            <p className="text-red-500">{applicantErrors.email.message}</p>
          )}

          <input
            type="password"
            {...registerApplicant("password", {
              required: "Password is required",
            })}
            placeholder="Password"
            className={input}
          />
          {applicantErrors.password && (
            <p className="text-red-500">{applicantErrors.password.message}</p>
          )}

          <button
            type="submit"
            disabled={isSubmittingApplicant}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
          >
            {isSubmittingApplicant ? (
              <>
                <Spinner className="text-white w-4 h-4" />
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>

        {/* HR/Job Poster Form */}
        <form
          onSubmit={handleHRSubmit(onHRSubmit)}
          className="space-y-4 md:pl-8"
        >
          <h2 className="text-2xl font-semibold text-green-700">
            HR / Job Poster
          </h2>

          <input
            {...registerHR("companyName", {
              required: "Company name is required",
            })}
            placeholder="Company Name"
            className={input}
          />
          {hrErrors.companyName && (
            <p className="text-red-500">{hrErrors.companyName.message}</p>
          )}

          <input
            {...registerHR("email", { required: "Email is required" })}
            placeholder="Work Email"
            className={input}
          />
          {hrErrors.email && (
            <p className="text-red-500">{hrErrors.email.message}</p>
          )}

          <input
            type="password"
            {...registerHR("password", { required: "Password is required" })}
            placeholder="Password"
            className={input}
          />
          {hrErrors.password && (
            <p className="text-red-500">{hrErrors.password.message}</p>
          )}

          <button
            type="submit"
            disabled={isSubmittingHR}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
          >
            {isSubmittingHR ? (
              <>
                <Spinner className="text-white w-4 h-4" />
              </>
            ) : (
              "Register"
            )}{" "}
          </button>
        </form>
      </div>
    </div>
  );
};
export default Register;
