import { useFieldArray, useFormContext } from "react-hook-form";
import { Trash2, Plus } from "lucide-react";

const degreeOptions = [
  "Bachelor's Degree",
  "Master's Degree",
  "PhD",
  "Associate Degree",
  "Diploma",
  "Certificate",
  "Other",
];

const EducationForm = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "educations",
  });

  // Add at least one form initially
  if (fields.length === 0) {
    append({
      degree: "",
      fieldOfStudy: "",
      institution: "",
      graduationYear: "",
      gpa: "",
    });
  }

  return (
    <div className="space-y-6">
      {fields.map((field, index) => (
        <div key={field.id} className="border border-gray-200 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Education {index + 1}</h3>
            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-600 hover:text-red-800 border border-gray-200 rounded px-2 py-1 text-sm flex items-center"
              >
                <Trash2 className="w-4 h-4" />
                <span className="ml-1">Remove</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block font-medium mb-1">Degree *</label>
              <select
                {...register(`educations.${index}.degree`, {
                  required: "Degree is required",
                })}
                className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="">Select degree</option>
                {degreeOptions.map((degree) => (
                  <option key={degree} value={degree}>
                    {degree}
                  </option>
                ))}
              </select>
              {errors.educations?.[index]?.degree && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.educations[index].degree.message}
                </p>
              )}
            </div>
            <div>
              <label className="block font-medium mb-1">Field of Study *</label>
              <input
                {...register(`educations.${index}.fieldOfStudy`, {
                  required: "Field of study is required",
                })}
                placeholder="Computer Science"
                className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
              />
              {errors.educations?.[index]?.fieldOfStudy && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.educations[index].fieldOfStudy.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block font-medium mb-1">Institution *</label>
              <input
                {...register(`educations.${index}.institution`, {
                  required: "Institution is required",
                })}
                placeholder="University Name"
                className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
              />
              {errors.educations?.[index]?.institution && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.educations[index].institution.message}
                </p>
              )}
            </div>
            <div>
              <label className="block font-medium mb-1">
                Graduation Year *
              </label>
              <input
                type="number"
                min="1950"
                max="2035"
                {...register(`educations.${index}.graduationYear`, {
                  required: "Graduation year is required",
                  min: {
                    value: 1950,
                    message: "Year must be 1950 or later",
                  },
                  max: {
                    value: 2035,
                    message: "Year must be 2035 or earlier",
                  },
                  pattern: {
                    value: /^\d{4}$/,
                    message: "Enter a valid 4-digit year",
                  },
                })}
                placeholder="2024"
                className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
              />
              {errors.educations?.[index]?.graduationYear && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.educations[index].graduationYear.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1">GPA (Optional)</label>
            <input
              {...register(`educations.${index}.gpa`)}
              placeholder="3.8"
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          append({
            degree: "",
            fieldOfStudy: "",
            institution: "",
            graduationYear: "",
            gpa: "",
          })
        }
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm flex items-center justify-center gap-2"
      >
        <Plus className="w-4 h-4" /> Add Another Education
      </button>
    </div>
  );
};

export default EducationForm;
