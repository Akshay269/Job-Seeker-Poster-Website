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
  const { register, control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "educations",
  });

  return (
    <div className="space-y-6">
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="border border-gray-200 rounded-lg p-6"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Education {index + 1}</h3>
            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-600 hover:text-red-800 border border-gray-200 rounded px-2 py-1 text-sm"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block font-medium mb-1">Degree *</label>
              <select
                {...register(`educations.${index}.degree`, { required: true })}
                className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="">Select degree</option>
                {degreeOptions.map((degree) => (
                  <option key={degree} value={degree.toLowerCase()}>
                    {degree}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-medium mb-1">Field of Study *</label>
              <input
                {...register(`educations.${index}.fieldOfStudy`, { required: true })}
                placeholder="Computer Science"
                className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block font-medium mb-1">Institution *</label>
              <input
                {...register(`educations.${index}.institution`, { required: true })}
                placeholder="University Name"
                className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Graduation Year *</label>
              <input
                type="number"
                min="1950"
                max="2030"
                {...register(`educations.${index}.graduationYear`, { required: true })}
                placeholder="2024"
                className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
              />
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
