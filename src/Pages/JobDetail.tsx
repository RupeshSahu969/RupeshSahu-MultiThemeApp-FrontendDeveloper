import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get(`https://jobpotalbackend-3.onrender.com/jobs/${id}`)
      .then(res => setJob(res.data))
      .catch(() => setError("Failed to load job details. Please try again later."))
      .finally(() => setLoading(false));
  }, [id]);

  const retryRequest = () => {
    setError(null);
    setLoading(true);
    axios.get(`https://jobpotalbackend-2.onrender.com/jobs/${id}`)
      .then(res => setJob(res.data))
      .catch(() => setError("Failed to load job details. Please try again later."))
      .finally(() => setLoading(false));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 flex justify-center items-center">
        <div className="bg-red-100 text-red-800 p-4 rounded-md">
          <p>{error}</p>
          <button 
            onClick={retryRequest} 
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!job) {
    return <p className="p-6">Job not found.</p>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-gray-800 mb-4">{job.title}</h1>
      <p className="text-xl text-gray-600 mb-4">{job.company} — {job.location}</p>

      <div className="space-y-4">
        <p className="text-lg text-gray-700">{job.description}</p>
        <p className="text-sm text-gray-500 font-semibold">Job Type: {job.type}</p>
      </div>

      <div className="mt-6">
        <Link
          to={`/applications/${job._id}`}
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
        >
          Apply Now
        </Link>
      </div>
    </div>
  );
};

export default JobDetail;
