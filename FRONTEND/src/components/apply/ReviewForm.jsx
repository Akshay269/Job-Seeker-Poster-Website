import { useFormContext } from "react-hook-form";

const ReviewForm = () => {
  const { getValues } = useFormContext();
  const values = getValues();
  // console.log(values);

  return (
    <div className="space-y-8 text-sm text-gray-800">
      {/* Personal Info */}
      <section>
        <h3 className="text-lg font-semibold text-black mb-2">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p><strong>Full Name:</strong> {values.personalInfo?.firstName} {values.personalInfo?.lastName}</p>
          <p><strong>Date of Birth:</strong> {values.personalInfo?.dateOfBirth || "-"}</p>
          <p><strong>Gender:</strong> {values.personalInfo?.gender || "-"}</p>
          <p><strong>Nationality:</strong> {values.personalInfo?.nationality || "-"}</p>
          <p><strong>Summary:</strong> {values.personalInfo?.summary || "-"}</p>
        </div>
       
      </section>

      {/* Contact Info */}
      <section>
        <h3 className="text-lg font-semibold text-black mb-2">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p><strong>Email:</strong> {values.contactInfo?.email || "-"}</p>
          <p><strong>Phone:</strong> {values.contactInfo?.phone || "-"}</p>
          <p><strong>Address:</strong> {values.contactInfo?.address || "-"}</p>
          <p><strong>City:</strong> {values.contactInfo?.city || "-"}</p>
          <p><strong>State:</strong> {values.contactInfo?.state || "-"}</p>
          <p><strong>ZIP Code:</strong> {values.contactInfo?.zip || "-"}</p>
          <p><strong>Country:</strong> {values.contactInfo?.country || "-"}</p>
          <p><strong>LinkedIn:</strong> {values.contactInfo?.linkedIn || "-"}</p>
          <p><strong>Portfolio:</strong> {values.contactInfo?.portfolio || "-"}</p>
        </div>
      </section>

      {/* Work Experience */}
      {values.experiences?.length > 0 && (
        <section>
          <h3 className="text-lg font-semibold text-black mb-2">Work Experience</h3>
          {values.experiences.map((exp, idx) => (
            <div key={idx} className="border rounded p-4 mb-2 bg-gray-50">
              <p><strong>Job Title:</strong> {exp.jobTitle}</p>
              <p><strong>Company:</strong> {exp.company}</p>
              <p><strong>Start Date:</strong> {exp.startDate}</p>
              <p><strong>End Date:</strong> {exp.isCurrent ? "Present" : exp.endDate || "-"}</p>
              {exp.description && (
                <p><strong>Description:</strong> {exp.description}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {values.educations?.length > 0 && (
        <section>
          <h3 className="text-lg font-semibold text-black mb-2">Education</h3>
          {values.educations.map((edu, idx) => (
            <div key={idx} className="border rounded p-4 mb-2 bg-gray-50">
              <p><strong>Degree:</strong> {edu.degree}</p>
              <p><strong>Field of Study:</strong> {edu.fieldOfStudy}</p>
              <p><strong>Institution:</strong> {edu.institution}</p>
              <p><strong>Graduation Year:</strong> {edu.graduationYear}</p>
              <p><strong>GPA:</strong> {edu.gpa || "N/A"}</p>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {values.skills?.length > 0 && (
        <section>
          <h3 className="text-lg font-semibold text-black mb-2">Technical Skills</h3>
          {values.skills.map((skill, idx) => (
            <p key={idx}>• {skill.name} – <span className="text-gray-600">{skill.level}</span></p>
          ))}
        </section>
      )}

      {/* Certifications */}
      {values.certifications?.length > 0 && (
        <section>
          <h3 className="text-lg font-semibold text-black mb-2">Certifications</h3>
          {values.certifications.map((cert, idx) => (
            <p key={idx}>
              • {cert.name} by {cert.issuer}
              {cert.year && ` (${cert.year})`}
            </p>
          ))}
        </section>
      )}

      {/* Languages */}
      {values.languages?.length > 0 && (
        <section>
          <h3 className="text-lg font-semibold text-black mb-2">Languages</h3>
          <p>{values.languages.join(", ")}</p>
        </section>
      )}

      {/* Documents */}
      <section>
        <h3 className="text-lg font-semibold text-black mb-2">Uploaded Documents</h3>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Resume:</strong> {values.resume?.name || "Not uploaded"}</li>
          <li><strong>Cover Letter:</strong> {values.coverLetter?.name || "Not uploaded"}</li>
          <li><strong>Portfolio:</strong> {values.portfolio?.name || "Not uploaded"}</li>
          {values.other?.length > 0 && (
            <li>
              <strong>Additional Files:</strong>
              <ul className="list-disc list-inside ml-4">
                {values.other.map((file, idx) => (
                  <li key={idx}>{file.name}</li>
                ))}
              </ul>
            </li>
          )}
        </ul>
      </section>
    </div>
  );
};

export default ReviewForm;
