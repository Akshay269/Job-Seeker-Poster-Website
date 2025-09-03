
import {useState,useEffect} from 'react';
import API from '../api/axios';

export const useJob = (jobId, setIsLoading) => {
  const [job, setJob] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      setIsLoading(true);
      try {
        const res = await API.get(`/jobs/${jobId}`);
        setJob(res.data);
      } catch {
        setError("Job not found or no longer accepting applications.");
      } finally {
        setIsLoading(false);
      }
    };
    if (jobId) fetchJob();
  }, [jobId, setIsLoading]);

  return { job, error };
};
