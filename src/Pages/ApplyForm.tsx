import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ApplyForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        email: '',
        resume_link: '',
        cover_letter: ''
    });

    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); 

        if (!form.name || !form.email || !form.resume_link) {
            setMessage({ type: 'error', text: 'Please fill in all required fields.' });
            return;
        }

        setLoading(true);

        try {
            await axios.post('https://jobpotalbackend-3.onrender.com/applications', {
                ...form,
                job_id: id
            });

            setMessage({ type: 'success', text: 'Application submitted successfully!' });
            setTimeout(() => {
                navigate('/');
            }, 1000);
        } catch (err) {
            setMessage({ type: 'error', text: 'Submission failed. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-xl mx-auto bg-white rounded shadow">
            <h2 className="text-xl font-bold mb-4">Apply for Job</h2>
            {message && (
                <div
                    className={`p-3 mb-4 rounded text-sm ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                >
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    name="resume_link"
                    placeholder="Resume URL"
                    value={form.resume_link}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <textarea
                    name="cover_letter"
                    placeholder="Cover Letter"
                    value={form.cover_letter}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />

            
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white hover:text-white px-4 py-2 rounded transition-colors"
                    disabled={loading} 
                >
                    {loading ? 'Submitting...' : 'Submit Application'}
                </button>
            </form>
        </div>
    );
};

export default ApplyForm;
