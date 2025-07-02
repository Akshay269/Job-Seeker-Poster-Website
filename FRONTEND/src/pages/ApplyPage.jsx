import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api/axios";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import Spinner from "../components/Spinner";
import PersonalInfoForm from "../components/apply/PersonalInfoForm";
import ContactInfoForm from "../components/apply/ContactInfoForm";
import ExperienceForm from "../components/apply/ExperienceForm";
import EducationForm from "../components/apply/EducationForm";
import SkillsForm from "../components/apply/SkillsForm";
import DocumentsForm from "../components/apply/DocumentsForm";
import ReviewForm from "../components/apply/ReviewForm";

const ApplyPage = () => {
  const { jobId } = useParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [job, setJob] = useState(null);
  const [loadingJob, setLoadingJob] = useState(true);
  const totalSteps = 7;

  const [formData, setFormData] = useState({
    personalInfo: {},
    contactInfo: {},
    experience: {},
    education: {},
    skills: {},
    documents: {},
  });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await API.get(`/jobs/${jobId}`);
        setJob(res.data);
      } catch (err) {
        console.error("Failed to fetch job details", err);
      } finally {
        setLoadingJob(false);
      }
    };

    fetchJob();
  }, [jobId]);

  const progress = (currentStep / totalSteps) * 100;

  const stepTitles = [
    "Personal Information",
    "Contact Details",
    "Work Experience",
    "Education",
    "Skills & Certifications",
    "Documents",
    "Review & Submit",
  ];

  const updateFormData = (step, data) => {
    setFormData((prev) => ({
      ...prev,
      [step]: data,
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Submitting application:", formData);
    // TODO: Post this to backend with jobId
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoForm
            data={formData.personalInfo}
            onUpdate={(data) => updateFormData("personalInfo", data)}
          />
        );
      case 2:
        return (
          <ContactInfoForm
            data={formData.contactInfo}
            onUpdate={(data) => updateFormData("contactInfo", data)}
          />
        );
      case 3:
        return (
          <ExperienceForm
            data={formData.experience}
            onUpdate={(data) => updateFormData("experience", data)}
          />
        );
      case 4:
        return (
          <EducationForm
            data={formData.education}
            onUpdate={(data) => updateFormData("education", data)}
          />
        );
      case 5:
        return (
          <SkillsForm
            data={formData.skills}
            onUpdate={(data) => updateFormData("skills", data)}
          />
        );
      case 6:
        return (
          <DocumentsForm
            data={formData.documents}
            onUpdate={(data) => updateFormData("documents", data)}
          />
        );
      case 7:
        return <ReviewForm data={formData} />;
      default:
        return null;
    }
  };

  if (!loadingJob && !job) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 font-semibold">
        Job not found or no longer accepting applications.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link
                to="/jobs"
                className="flex items-center text-gray-600 hover:text-black mr-6"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Jobs
              </Link>
              <div>
                <h1 className="text-xl font-bold text-black">Job Application</h1>
                {loadingJob ? (
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <Spinner className="w-4 h-4" /> Loading job...
                  </p>
                ) : (
                  <p className="text-sm text-gray-600">
                    {job?.title} at {job?.postedBy?.companyName}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-black">
                Step {currentStep} of {totalSteps}
              </span>
              <span className="text-sm text-gray-600">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded">
              <div
                className="bg-black h-2 rounded transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <h2 className="text-lg font-semibold text-black">
            {stepTitles[currentStep - 1]}
          </h2>
        </div>
      </div>

      {/* Form Body */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border p-8">
          {renderStep()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
          >
            <ArrowLeft className="w-4 h-4 inline mr-1" />
            Previous
          </button>

          {currentStep === totalSteps ? (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 text-sm"
            >
              <Check className="w-4 h-4 inline mr-1" />
              Submit Application
            </button>
          ) : (
            <button
              onClick={nextStep}
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 text-sm"
            >
              Next <ArrowRight className="w-4 h-4 inline ml-1" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplyPage;
