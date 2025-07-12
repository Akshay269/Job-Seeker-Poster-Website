import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
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
import useAuthStore from "../store/authStore";
import { toast } from "react-hot-toast";

const ApplyPage = () => {
  const { jobId } = useParams();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 7;

  const [job, setJob] = useState(null);
  const [loadingJob, setLoadingJob] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { user } = useAuthStore();

  const methods = useForm({
    defaultValues: {
      personalInfo: {
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        gender: "",
        summary: "",
        nationality: "",
      },
      contactInfo: {
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        linkedIn: "",
        portfolio: "",
        country: "",
      },
      experiences: [
        {
          jobTitle: "",
          company: "",
          startDate: "",
          endDate: "",
          isCurrent: false,
          description: "",
        },
      ],
      educations: [
        {
          degree: "",
          fieldOfStudy: "",
          institution: "",
          graduationYear: "",
          gpa: "",
        },
      ],
      skills: [],
      certifications: [],
      languages: [],
      resume: null,
      coverLetter: null,
      portfolio: null,
      other: [],
    },
  });

  const {
    handleSubmit,
    trigger,
    formState: { isSubmitting },
  } = methods;

  // Fetch job details
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

  const stepTitles = [
    "Personal Information",
    "Contact Details",
    "Work Experience",
    "Education",
    "Skills & Certifications",
    "Documents",
    "Review & Submit",
  ];

  const progress = (currentStep / totalSteps) * 100;

  const nextStep = async () => {
    const isValid = await trigger();
    if (isValid && currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const onSubmit = async (data) => {
    if (hasSubmitted) return;

    const payload = {
      jobId,
      applicantId: user?.id,
      personalInfo: {
        fullName: `${data.personalInfo.firstName} ${data.personalInfo.lastName}`,
        dateOfBirth: data.personalInfo.dateOfBirth,
        gender: data.personalInfo.gender,
        summary: data.personalInfo.summary,
        country: data.personalInfo.nationality,
      },
      contactInfo: {
        email: data.contactInfo.email,
        phone: data.contactInfo.phone,
        address: data.contactInfo.address,
        city: data.contactInfo.city,
        state: data.contactInfo.state,
        zip: data.contactInfo.zip,
        linkedIn: data.contactInfo.linkedIn,
        portfolio: data.contactInfo.portfolio,
        country: data.contactInfo.country,
      },
      experiences: data.experiences || [],
      educations: data.educations || [],
      skills: data.skills || [],
      certifications: data.certifications || [],
      languages: data.languages?.map((l) => l.name) || [],
      resume: data.resume?.url,
      coverLetter: data.coverLetter?.url || "",
      portfolio: data.portfolio?.url || "",
      otherFiles: (data.other || []).map((file) => file.url),
    };

    setSubmitting(true);
    try {
      const res = await API.post("applications/submit", payload);
      toast.success("Application submitted successfully!",res);
      setHasSubmitted(true);
    } catch (err) {
      console.error("❌ Failed to submit application", err);
      toast.error("Error submitting application.");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep]);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoForm />;
      case 2:
        return <ContactInfoForm />;
      case 3:
        return <ExperienceForm />;
      case 4:
        return <EducationForm />;
      case 5:
        return <SkillsForm />;
      case 6:
        return <DocumentsForm />;
      case 7:
        return <ReviewForm />;
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
    <div className="relative min-h-screen bg-gray-50">
      {(loadingJob || submitting) && (
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-50 flex items-center justify-center">
          <Spinner className="w-8 h-8 text-black" />
        </div>
      )}

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
                {job && (
                  <p className="text-sm text-gray-600">
                    {job.title} at {job?.postedBy?.companyName}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress */}
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

      {/* Form */}
      <FormProvider {...methods}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="max-w-4xl mx-auto px-4 py-8"
        >
          <div className="bg-white rounded-lg shadow-sm border p-8">
            {renderStep()}
          </div>

          <div className="flex justify-between items-center mt-8">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
              >
                <ArrowLeft className="w-4 h-4 inline mr-1" />
                Previous
              </button>
            )}

            {currentStep === totalSteps ? (
              <button
                type="button"
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting || hasSubmitted}
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 text-sm"
              >
                <Check className="w-4 h-4 inline mr-1" />
                Submit Application
              </button>
            ) : (
              <button
                type="button"
                onClick={nextStep}
                disabled={isSubmitting}
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 text-sm"
              >
                Next <ArrowRight className="w-4 h-4 inline ml-1" />
              </button>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default ApplyPage;
