import { useFormContext } from "react-hook-form";
import CountryAutocomplete from "./CountryAutocomplete";

const PersonalInfoForm = () => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const gender = watch("personalInfo.gender");

  return (
    <div className="space-y-6">
      {/* Name Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block font-medium" htmlFor="firstName">
            First Name *
          </label>
          <input
            id="firstName"
            {...register("personalInfo.firstName", { required: "First name is required" })}
            className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Enter your first name"
          />
          {errors.personalInfo?.firstName && (
            <p className="text-sm text-red-500 mt-1">
              {String(errors.personalInfo.firstName.message)}
            </p>
          )}
        </div>
        <div>
          <label className="block font-medium" htmlFor="lastName">
            Last Name *
          </label>
          <input
            id="lastName"
            {...register("personalInfo.lastName", { required: "Last name is required" })}
            className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Enter your last name"
          />
          {errors.personalInfo?.lastName && (
            <p className="text-sm text-red-500 mt-1">
              {String(errors.personalInfo.lastName.message)}
            </p>
          )}
        </div>
      </div>

      {/* DOB & Gender */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block font-medium" htmlFor="dob">
            Date of Birth *
          </label>
          <input
            type="date"
            id="dob"
            {...register("personalInfo.dateOfBirth", {
              required: "Date of Birth is required",
              validate: (value) => {
                const dob = new Date(value);
                const today = new Date();
                const age = today.getFullYear() - dob.getFullYear();
                const hasBirthdayPassed =
                  today.getMonth() > dob.getMonth() ||
                  (today.getMonth() === dob.getMonth() &&
                    today.getDate() >= dob.getDate());
                const actualAge = hasBirthdayPassed ? age : age - 1;
                return actualAge >= 18 || "You must be at least 18 years old";
              },
            })}
            className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
          />
          {errors.personalInfo?.dateOfBirth && (
            <p className="text-sm text-red-500 mt-1">
              {String(errors.personalInfo.dateOfBirth.message)}
            </p>
          )}
        </div>
        <div>
          <label className="block font-medium" htmlFor="gender">
            Gender *
          </label>
          <select
            id="gender"
            value={gender || ""}
            onChange={(e) => setValue("personalInfo.gender", e.target.value)}
            {...register("personalInfo.gender", { required: "Gender is required" })}
            className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="" disabled>Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer-not-to-say">Prefer not to say</option>
          </select>
          {errors.personalInfo?.gender && (
            <p className="text-sm text-red-500 mt-1">
              {String(errors.personalInfo.gender.message)}
            </p>
          )}
        </div>
      </div>

      {/* Nationality */}
      <div>
        <label className="block font-medium" htmlFor="nationality">
          Nationality *
        </label>
        <CountryAutocomplete fieldPath="personalInfo.nationality" />
      </div>

      {/* Summary */}
      <div>
        <label className="block font-medium" htmlFor="summary">
          Professional Summary *
        </label>
        <textarea
          id="summary"
          {...register("personalInfo.summary", { required: "Summary is required" })}
          rows={4}
          className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
          placeholder="Brief overview of your professional background and career objectives"
        />
        {errors.personalInfo?.summary && (
          <p className="text-sm text-red-500 mt-1">
            {String(errors.personalInfo.summary.message)}
          </p>
        )}
      </div>
    </div>
  );
};

export default PersonalInfoForm;
