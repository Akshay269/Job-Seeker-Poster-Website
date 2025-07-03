import { useState } from "react";
import { X, Plus } from "lucide-react";

const SkillsForm = () => {
  const [formData, setFormData] = useState({
    skills: [],
    certifications: [],
    languages: [],
  });

  const [newSkill, setNewSkill] = useState({ name: "", level: "" });
  const [newCertification, setNewCertification] = useState({
    name: "",
    issuer: "",
    year: "",
  });
  const [newLanguage, setNewLanguage] = useState("");

  const addSkill = () => {
    if (newSkill.name && newSkill.level) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, { id: Date.now().toString(), ...newSkill }],
      }));
      setNewSkill({ name: "", level: "" });
    }
  };

  const removeSkill = (id) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s.id !== id),
    }));
  };

  const addCertification = () => {
    if (newCertification.name && newCertification.issuer) {
      setFormData((prev) => ({
        ...prev,
        certifications: [
          ...prev.certifications,
          { id: Date.now().toString(), ...newCertification },
        ],
      }));
      setNewCertification({ name: "", issuer: "", year: "" });
    }
  };

  const removeCertification = (id) => {
    setFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((c) => c.id !== id),
    }));
  };

  const addLanguage = () => {
    if (newLanguage && !formData.languages.includes(newLanguage)) {
      setFormData((prev) => ({
        ...prev,
        languages: [...prev.languages, newLanguage],
      }));
      setNewLanguage("");
    }
  };

  const removeLanguage = (language) => {
    setFormData((prev) => ({
      ...prev,
      languages: prev.languages.filter((l) => l !== language),
    }));
  };

  return (
    <div className="space-y-8">
      {/* Skills */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Technical Skills</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            placeholder="Skill (e.g., React)"
            className="border rounded p-2"
            value={newSkill.name}
            onChange={(e) =>
              setNewSkill((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          <select
            className="border rounded p-2"
            value={newSkill.level}
            onChange={(e) =>
              setNewSkill((prev) => ({ ...prev, level: e.target.value }))
            }
          >
            <option value="">Select level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="expert">Expert</option>
          </select>
          <button
            type="button"
            onClick={addSkill}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 flex items-center justify-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Skill
          </button>
        </div>

        <div className="space-y-2">
          {formData.skills.map((skill) => (
            <div
              key={skill.id}
              className="flex justify-between items-center bg-gray-50 p-3 rounded"
            >
              <div>
                <span className="font-medium">{skill.name}</span>
                <span className="ml-2 text-sm text-gray-600">({skill.level})</span>
              </div>
              <button
                type="button"
                className="text-gray-500 hover:text-red-600"
                onClick={() => removeSkill(skill.id)}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Certifications</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <input
            type="text"
            placeholder="Certification name"
            className="border rounded p-2"
            value={newCertification.name}
            onChange={(e) =>
              setNewCertification((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
          />
          <input
            type="text"
            placeholder="Issuer"
            className="border rounded p-2"
            value={newCertification.issuer}
            onChange={(e) =>
              setNewCertification((prev) => ({
                ...prev,
                issuer: e.target.value,
              }))
            }
          />
          <input
            type="number"
            placeholder="Year"
            min="1990"
            max="2030"
            className="border rounded p-2"
            value={newCertification.year}
            onChange={(e) =>
              setNewCertification((prev) => ({
                ...prev,
                year: e.target.value,
              }))
            }
          />
          <button
            type="button"
            onClick={addCertification}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 flex items-center justify-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add
          </button>
        </div>

        <div className="space-y-2">
          {formData.certifications.map((cert) => (
            <div
              key={cert.id}
              className="flex justify-between items-center bg-gray-50 p-3 rounded"
            >
              <div>
                <span className="font-medium">{cert.name}</span>
                <span className="text-gray-600 ml-2">by {cert.issuer}</span>
                {cert.year && <span className="ml-2 text-sm">({cert.year})</span>}
              </div>
              <button
                type="button"
                className="text-gray-500 hover:text-red-600"
                onClick={() => removeCertification(cert.id)}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Languages */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Languages</h3>
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Language"
            className="border rounded p-2 flex-1"
            value={newLanguage}
            onChange={(e) => setNewLanguage(e.target.value)}
          />
          <button
            type="button"
            onClick={addLanguage}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 flex items-center justify-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {formData.languages.map((lang) => (
            <div
              key={lang}
              className="flex items-center bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm"
            >
              {lang}
              <button
                type="button"
                onClick={() => removeLanguage(lang)}
                className="ml-2 hover:text-red-600"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsForm;
