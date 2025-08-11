import { useFormContext, useFieldArray } from "react-hook-form";
import { Plus, Trash2, X } from "lucide-react";
import { useEffect } from "react";

const SkillsForm = () => {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext();

  const {
    fields: skillFields,
    append: appendSkill,
    remove: removeSkill,
  } = useFieldArray({ control, name: "skills" });

  const {
    fields: certFields,
    append: appendCert,
    remove: removeCert,
  } = useFieldArray({ control, name: "certifications" });

  const {
    fields: langFields,
    append: appendLang,
    remove: removeLang,
  } = useFieldArray({ control, name: "languages" });

  // Form values
  const skills = watch("skills");
  useEffect(() => {
    if (skillFields.length === 0) {
      appendSkill({ name: "", level: "" });
    }
  }, []);
  return (
    <div className="space-y-10">
      <div>
        <h3 className="text-lg font-semibold mb-4">Technical Skills *</h3>

        {skillFields.map((field, index) => (
          <div
            key={field.id}
            className="grid grid-cols-12 gap-4 mb-3 items-center"
          >
            <input
              {...register(`skills.${index}.name`, {
                required:
                  skillFields.length > 0 ? "Skill name is required" : false,
              })}
              placeholder="Skill name (e.g., React)"
              className="col-span-5 border border-gray-300 rounded px-3 py-2"
            />
            <select
              {...register(`skills.${index}.level`, {
                required:
                  skillFields.length > 0 ? "Skill level is required" : false,
              })}
              className="col-span-5 border border-gray-300 rounded px-3 py-2"
            >
              <option value="">Select level</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="expert">Expert</option>
            </select>

            <button
              type="button"
              onClick={() => removeSkill(index)}
              className="col-span-2 text-gray-500 hover:text-red-600"
            >
              <Trash2 className="w-5 h-5" />
            </button>

            {(errors.skills?.[index]?.name ||
              errors.skills?.[index]?.level) && (
              <div className="col-span-12 text-red-500 text-sm">
                {errors.skills?.[index]?.name?.message ||
                  errors.skills?.[index]?.level?.message}
              </div>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={() => appendSkill({ name: "", level: "" })}
          className="flex items-center px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 text-sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Skill
        </button>

        {skills && skills.length < 3 && (
          <p className="text-sm text-red-500 mt-2">
            Please add at least 3 technical skills.
          </p>
        )}
      </div>

      {/* === Certifications === */}
      <div>
        <h3 className="text-lg font-semibold mb-4">
          Certifications (Optional)
        </h3>

        {certFields.map((field, index) => (
          <div
            key={field.id}
            className="grid grid-cols-12 gap-4 mb-3 items-center"
          >
            <input
              {...register(`certifications.${index}.name`)}
              placeholder="Certification Name"
              className="col-span-4 border border-gray-300 rounded px-3 py-2"
            />
            <input
              {...register(`certifications.${index}.issuer`)}
              placeholder="Issuer"
              className="col-span-4 border border-gray-300 rounded px-3 py-2"
            />
            <input
              type="number"
              {...register(`certifications.${index}.year`)}
              placeholder="Year"
              min="1990"
              max="2030"
              className="col-span-3 border border-gray-300 rounded px-3 py-2"
            />
            <button
              type="button"
              onClick={() => removeCert(index)}
              className="col-span-1 text-gray-500 hover:text-red-600"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => appendCert({ name: "", issuer: "", year: "" })}
          className="flex items-center px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 text-sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Certification
        </button>
      </div>

      {/* === Languages === */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Languages (Optional)</h3>

        {langFields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-3 mb-2">
            <input
              {...register(`languages.${index}.name`)}
              placeholder="Language"
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
            <button
              type="button"
              onClick={() => removeLang(index)}
              className="text-gray-500 hover:text-red-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => appendLang({ name: "" })}
          className="flex items-center px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 text-sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Language
        </button>
      </div>
    </div>
  );
};

export default SkillsForm;
