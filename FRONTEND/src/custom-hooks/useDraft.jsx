import { useEffect } from "react";
import  API  from "../api/axios";
import { toast } from "react-hot-toast";

export const useDraft = (user, jobId, reset, setIsLoading, methods) => {
  useEffect(() => {
    if (!user?.id || !jobId) return;

    const fetchDraft = async () => {
      try {
        const res = await API.get(`/drafts/${user.id}`);
        const drafts = res.data;
        const draft = drafts.find((d) => d.jobId === jobId);
        if (draft?.data) {
          const data = draft.data;
          methods.reset({
            personalInfo: {
              firstName: data.personalInfo?.firstName || "",
              lastName: data.personalInfo?.lastName || "",
              dateOfBirth: data.personalInfo?.dateOfBirth || "",
              gender: data.personalInfo?.gender || "",
              summary: data.personalInfo?.summary || "",
              nationality: data.personalInfo?.nationality || "",
            },
            contactInfo: {
              email: data.contactInfo?.email || "",
              phone: data.contactInfo?.phone || "",
              address: data.contactInfo?.address || "",
              city: data.contactInfo?.city || "",
              state: data.contactInfo?.state || "",
              zip: data.contactInfo?.zip || "",
              linkedIn: data.contactInfo?.linkedIn || "",
              portfolio: data.contactInfo?.portfolio || "",
              country: data.contactInfo?.country || "",
            },
            experiences: data.experiences || [
              {
                jobTitle: "",
                company: "",
                startDate: "",
                endDate: "",
                isCurrent: false,
                description: "",
              },
            ],
            educations: data.educations || [
              {
                degree: "",
                fieldOfStudy: "",
                institution: "",
                graduationYear: "",
                gpa: "",
              },
            ],
            skills: data.skills || [],
            certifications: data.certifications || [],
            languages: data.languages?.map((l) => ({ name: l })) || [],
            resume: data.resume ? { url: data.resume } : null,
            coverLetter: data.coverLetter ? { url: data.coverLetter } : null,
            portfolio: data.portfolio ? { url: data.portfolio } : null,
            other: (data.otherFiles || []).map((url) => ({ url })),
          });
          toast.success("Draft loaded SuccessFully");
        }
      } catch (err) {
        console.error("Failed to fetch draft", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDraft();
  }, [user, jobId, reset, setIsLoading, methods]);
};
