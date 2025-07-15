import { Link } from 'react-router-dom';

const JobCard = ({ job }: { job: any }) => {
  return (
    <div className="border rounded-lg p-6 shadow-sm bg-white hover:shadow-lg hover:bg-gray-50 transform hover:-translate-y-1 transition-all duration-200 ease-in-out">
      <h2 className="text-xl font-semibold text-gray-800 mb-1">{job.title}</h2>
      <p className="text-gray-600 mb-3">
        {job.company} — {job.location}
      </p>
      <Link
        to={`/jobs/${job._id}`}
        className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-150"
      >
        View Details →
      </Link>
    </div>
  );
};

export default JobCard;
