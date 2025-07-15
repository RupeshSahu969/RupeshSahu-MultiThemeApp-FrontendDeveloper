import { useEffect, useState } from 'react';
import axios from 'axios';
import JobCard from '../Components/JobCard';

const Home = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [jobType, setJobType] = useState<string>('');

  useEffect(() => {
    axios.get('https://jobpotalbackend-3.onrender.com/jobs')
      .then(res => {
        setJobs(res.data);
        setFilteredJobs(res.data);
      })
      .catch(() => alert("Failed to fetch jobs."))
      .finally(() => setLoading(false));
  }, []);

  const handleJobTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType = e.target.value.toLowerCase();
    setJobType(selectedType);

    if (selectedType === '') {
      setFilteredJobs(jobs);
    } else {
      setFilteredJobs(jobs.filter(job => job.type.toLowerCase() === selectedType));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center my-4">Available Jobs</h1>
      <div className="mb-4">
        <label htmlFor="jobType" className="mr-2">Filter by Job Type:</label>
        <select
          id="jobType"
          value={jobType}
          onChange={handleJobTypeChange}
          className="px-4 py-2 border rounded"
        >
          <option value="">All Jobs</option>
          <option value="full-time">Full-Time</option>
          <option value="part-time">Part-Time</option>
          <option value="remote">Remote</option>
        </select>
      </div>
      {loading ? (
        <p>Loading jobs...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job: any) => (
              <JobCard key={job._id} job={job} />
            ))
          ) : (
            <p>No jobs found for this type.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
