import { useFormContext, useFieldArray } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";

const ExperienceForm = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experiences",
  });

  return (
    <div className="space-y-6">
      {fields.map((item, index) => (
        <div
          key={item.id}
          className="border border-gray-200 rounded-lg p-6 space-y-4"
        >
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Experience {index + 1}</h3>
            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-600 text-sm hover:underline flex items-center"
              >
                <Trash2 className="w-4 h-4 mr-1" /> Remove
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">Job Title *</label>
              <input
                {...register(`experiences.${index}.jobTitle`, {
                  required: "Job Title is required",
                })}
                className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Frontend Developer"
              />
              {errors.experiences?.[index]?.jobTitle && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.experiences[index].jobTitle.message}
                </p>
              )}
            </div>
            <div>
              <label className="block font-medium">Company *</label>
              <input
                {...register(`experiences.${index}.company`, {
                  required: "Company is required",
                })}
                className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Tech Corp"
              />
              {errors.experiences?.[index]?.company && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.experiences[index].company.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">Start Date *</label>
              <input
                type="date"
                {...register(`experiences.${index}.startDate`, {
                  required: "Start date is required",
                })}
                className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
              />
              {errors.experiences?.[index]?.startDate && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.experiences[index].startDate.message}
                </p>
              )}
            </div>
            <div>
              <label className="block font-medium">End Date</label>
              <input
                type="date"
                {...register(`experiences.${index}.endDate`)}
                className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
          </div>

          <div>
            <label className="inline-flex items-center space-x-2">
              <input
                type="checkbox"
                {...register(`experiences.${index}.isCurrent`)}
              />
              <span>I currently work here</span>
            </label>
          </div>

          <div>
            <label className="block font-medium">Job Description</label>
            <textarea
              {...register(`experiences.${index}.description`)}
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Describe responsibilities, tools used, achievements..."
              rows={3}
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          append({
            jobTitle: "",
            company: "",
            startDate: "",
            endDate: "",
            isCurrent: false,
            description: "",
          })
        }
        className="w-full mt-6 px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-100 flex items-center justify-center"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Another Experience
      </button>
    </div>
  );
};

export default ExperienceForm;
