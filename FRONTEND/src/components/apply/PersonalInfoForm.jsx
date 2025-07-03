import { useFormContext } from "react-hook-form";

const PersonalInfoForm = () => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const gender = watch("gender");

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block font-medium" htmlFor="firstName">
            First Name *
          </label>
          <input
            id="firstName"
            {...register("firstName", { required: "First name is required" })}
            className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Enter your first name"
          />
          {errors.firstName?.message && (
            <p className="text-sm text-red-500 mt-1">{String(errors.firstName.message)}</p>
          )}
        </div>
        <div>
          <label className="block font-medium" htmlFor="lastName">
            Last Name *
          </label>
          <input
            id="lastName"
            {...register("lastName", { required: "Last name is required" })}
            className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Enter your last name"
          />
          {errors.lastName?.message && (
            <p className="text-sm text-red-500 mt-1">{String(errors.lastName.message)}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block font-medium" htmlFor="dateOfBirth">
            Date of Birth
          </label>
          <input
            type="date"
            id="dateOfBirth"
            {...register("dateOfBirth",{ required: "Date of Birth is required" })}
            className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
          />
           {errors.dateOfBirth?.message && (
            <p className="text-sm text-red-500 mt-1">{String(errors.dateOfBirth.message)}</p>
          )}
        </div>
        <div>
          <label className="block font-medium" htmlFor="gender">
            Gender
          </label>
          <select
            id="gender"
            value={gender || ""}
            onChange={(e) => setValue("gender", e.target.value)}
            className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
            {...register("gender",{required:"Gender is required"})}
          >
            <option value="" disabled>
              Select gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer-not-to-say">Prefer not to say</option>
          </select>
           {errors.gender?.message && (
            <p className="text-sm text-red-500 mt-1">{String(errors.gender.message)}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block font-medium" htmlFor="nationality">
          Nationality
        </label>
        <input
          id="nationality"
          {...register("nationality",{required:"Nationality is required"})}
          className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
          placeholder="Enter your nationality"
        />
         {errors.nationality?.message && (
            <p className="text-sm text-red-500 mt-1">{String(errors.nationality.message)}</p>
          )}
      </div>

      <div>
        <label className="block font-medium" htmlFor="summary">
          Professional Summary
        </label>
        <textarea
          id="summary"
          className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
          rows={4}
          placeholder="Brief overview of your professional background and career objectives"
           {...register("summary",{required:"Summary is required"})}
        />
         {errors.summary?.message && (
            <p className="text-sm text-red-500 mt-1">{String(errors.summary.message)}</p>
          )}
      </div>
    </div>
  );
};

export default PersonalInfoForm;
