import { useEffect, useState } from 'react';
import axios from 'axios';

const Admin = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    axios.get('https://jobpotalbackend-3.onrender.com/applications')
      .then(res => setApplications(res.data))
      .catch(err => console.error('Error fetching applications:', err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Submitted Applications</h2>

      <div className="overflow-x-auto">
        <table className="w-full table-auto md:table-fixed border border-gray-300 text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Candidate</th>
              <th className="p-2">Email</th>
              <th className="p-2">Resume</th>
              <th className="p-2">Cover Letter</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app: any) => (
              <tr key={app._id} className="border-t">
                <td className="p-2">{app.name}</td>
                <td className="p-2">{app.email}</td>
                <td className="p-2">
                  <a href={app.resume_link} target="_blank" className="text-blue-600 underline">View</a>
                </td>
                <td className="p-2">{app.cover_letter}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
