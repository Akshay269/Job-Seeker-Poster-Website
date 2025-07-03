import { useState, useEffect } from "react";
import { Upload, File, X, Plus } from "lucide-react";

const DocumentsForm = () => {
  const [formData, setFormData] = useState({
    resume: null,
    coverLetter: null,
    portfolio: null,
    other: [],
  });

  useEffect(() => {
    // You can lift this data up via props if needed
    // onUpdate(formData);
  }, [formData]);

  const handleFileUpload = (field, file) => {
    setFormData((prev) => ({
      ...prev,
      [field]: file,
    }));
  };

  const handleMultipleFileUpload = (files) => {
    if (files) {
      const fileArray = Array.from(files);
      setFormData((prev) => ({
        ...prev,
        other: [...(prev.other || []), ...fileArray],
      }));
    }
  };

  const removeOtherFile = (index) => {
    setFormData((prev) => ({
      ...prev,
      other: prev.other.filter((_, i) => i !== index),
    }));
  };

  const FileUploadBox = ({ label, field, accept, required = false }) => {
    const file = formData[field];

    return (
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
        <div className="space-y-2">
          <Upload className="w-8 h-8 mx-auto text-gray-400" />
          <div>
            <p className="text-lg font-medium">
              {label} {required && <span className="text-red-500">*</span>}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Upload your {label.toLowerCase()} (PDF, DOC, DOCX)
            </p>
          </div>

          {file ? (
            <div className="flex items-center justify-center gap-2 mt-4">
              <File className="w-4 h-4" />
              <span className="text-sm font-medium">{file.name}</span>
              <button
                type="button"
                className="text-gray-500 hover:text-red-600"
                onClick={() => handleFileUpload(field, null)}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="mt-4">
              <input
                type="file"
                accept={accept}
                onChange={(e) =>
                  handleFileUpload(field, e.target.files?.[0] || null)
                }
                className="hidden"
                id={`file-${field}`}
              />
              <button
                type="button"
                onClick={() =>
                  document.getElementById(`file-${field}`)?.click()
                }
                className="px-4 py-2 border border-gray-300 rounded text-sm hover:bg-gray-100"
              >
                Choose File
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FileUploadBox
          label="Resume"
          field="resume"
          accept=".pdf,.doc,.docx"
          required
        />
        <FileUploadBox
          label="Cover Letter"
          field="coverLetter"
          accept=".pdf,.doc,.docx"
        />
      </div>

      <FileUploadBox
        label="Portfolio"
        field="portfolio"
        accept=".pdf,.doc,.docx,.zip"
      />

      {/* Additional Documents */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
        <div className="text-center space-y-2 mb-4">
          <Upload className="w-8 h-8 mx-auto text-gray-400" />
          <div>
            <p className="text-lg font-medium">Additional Documents</p>
            <p className="text-sm text-gray-600 mt-1">
              Upload any additional documents (certificates, references, etc.)
            </p>
          </div>
        </div>

        <div className="text-center mb-4">
          <input
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            onChange={(e) => handleMultipleFileUpload(e.target.files)}
            className="hidden"
            id="additional-files"
          />
          <button
            type="button"
            onClick={() =>
              document.getElementById("additional-files")?.click()
            }
            className="px-4 py-2 border border-gray-300 rounded text-sm hover:bg-gray-100 flex items-center justify-center mx-auto"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Files
          </button>
        </div>

        {formData.other && formData.other.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Uploaded Files:</p>
            {formData.other.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-50 p-2 rounded"
              >
                <div className="flex items-center gap-2">
                  <File className="w-4 h-4" />
                  <span className="text-sm">{file.name}</span>
                </div>
                <button
                  type="button"
                  className="text-gray-500 hover:text-red-600"
                  onClick={() => removeOtherFile(index)}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">File Upload Guidelines:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Maximum file size: 10MB per file</li>
          <li>• Accepted formats: PDF, DOC, DOCX, JPG, PNG, ZIP</li>
          <li>• Ensure all documents are clearly readable</li>
          <li>• Resume is required for application submission</li>
        </ul>
      </div>
    </div>
  );
};

export default DocumentsForm;
