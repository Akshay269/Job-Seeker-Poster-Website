import { useFormContext, Controller } from "react-hook-form";
import { Upload, File, X, Plus } from "lucide-react";
import { useRef } from "react";
import API from "../../api/axios";
import { useLoading } from "../../context/LoadingContext";

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

const getUploadSignature = async () => {
  const res = await API.get(`/cloudinary/signature`);
  return await res.data;
};



const uploadToCloudinary = async (file) => {
  const { timestamp, signature, apiKey, folder } = await getUploadSignature();
  const formData = new FormData();

  formData.append("file", file);
  formData.append("api_key", apiKey);
  formData.append("timestamp", timestamp);
  formData.append("signature", signature);
  formData.append("folder", folder);

  const isImageOrPdf = file.type.startsWith("image/") || file.type === "application/pdf";
  const resourceType = isImageOrPdf ? "image" : "raw";

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) throw new Error("Upload failed");

  const data = await res.json();
  return { url: data.secure_url, publicId: data.public_id };
};

const deleteFromCloudinary = async (publicId) => {
  await API.post(`/cloudinary/delete`, { publicId });
};

const DocumentsForm = () => {
  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const { setIsLoading } = useLoading();

  const other = watch("other") || [];
  const otherFilesRef = useRef();

  const handleOtherFilesChange = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    try {
      setIsLoading(true);
      const uploaded = await Promise.all(
        files.map(async (file) => {
          try {
            return await uploadToCloudinary(file);
          } catch (err) {
            console.error("Upload failed", err);
            return null;
          }
        })
      );

      setValue("other", [...other, ...uploaded.filter(Boolean)], {
        shouldValidate: true,
      });
    } catch (err) {
      console.error("File upload error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const removeOtherFile = async (index) => {
    const files = [...other];
    const fileToDelete = files[index];
    if (!fileToDelete?.publicId) return;

    setValue("other", files.filter((_, i) => i !== index), {
      shouldValidate: true,
    });

    try {
      await deleteFromCloudinary(fileToDelete.publicId);
    } catch (err) {
      console.error("Failed to delete file", err);
    }
  };

  const FileUploadBox = ({ label, field, required = false, accept }) => (
    <Controller
      name={field}
      control={control}
      rules={{
        validate: (val) => {
          if (required && !val) return `${label} is required`;
          return true;
        },
      }}
      render={({ field: { onChange, value } }) => (
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

            {value ? (
              <div className="flex items-center justify-center gap-2 mt-4">
                <File className="w-4 h-4" />
                <span className="text-sm font-medium">Uploaded</span>
                <button
                  type="button"
                  className="text-gray-500 hover:text-red-600"
                  onClick={async () => {
                    setIsLoading(true);
                    try {
                      await deleteFromCloudinary(value.publicId);
                      onChange(null);
                    } catch (err) {
                      console.error("Failed to delete", err);
                    } finally {
                      setIsLoading(false);
                    }
                  }}
                >
                  <X className="w-4 h-4 cursor-pointer" />
                </button>
              </div>
            ) : (
              <div className="mt-4">
                <input
                  type="file"
                  accept={accept}
                  className="hidden"
                  id={`file-${field}`}
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    setIsLoading(true);
                    try {
                      const uploaded = await uploadToCloudinary(file);
                      onChange(uploaded);
                    } catch (err) {
                      console.error("Upload failed", err);
                    } finally {
                      setIsLoading(false);
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById(`file-${field}`)?.click()
                  }
                  className="px-4 py-2 border border-gray-300 rounded text-sm hover:bg-gray-100 cursor-pointer"
                >
                  Choose File
                </button>
              </div>
            )}

            {errors[field] && (
              <p className="text-sm text-red-500">{errors[field].message}</p>
            )}
          </div>
        </div>
      )}
    />
  );

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
            ref={otherFilesRef}
            className="hidden"
            onChange={handleOtherFilesChange}
          />
          <button
            type="button"
            onClick={() => otherFilesRef.current?.click()}
            className="px-4 py-2 border border-gray-300 rounded text-sm hover:bg-gray-100 flex items-center justify-center mx-auto"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Files
          </button> 
        </div>

        {other?.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Uploaded Files:</p>
            {other.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-50 p-2 rounded"
              >
                <div className="flex items-center gap-2">
                  <File className="w-4 h-4" />
                  <span className="text-sm">{file.url.split("/").pop()}</span>
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
        <h4 className="font-medium text-blue-900 mb-2">
          File Upload Guidelines:
        </h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>
            • Maximum file size: 10MB per file
          </li>
          <li>
            • Accepted formats: PDF, DOC, DOCX, JPG, PNG, ZIP
          </li>
          <li>
            • Ensure all documents are clearly readable
          </li>
          <li>
            • Resume is required for application submission
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DocumentsForm;