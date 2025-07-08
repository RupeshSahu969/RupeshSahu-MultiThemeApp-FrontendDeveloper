import { useEffect, useState } from "react";
import api from "../Api/Api";
import { useNavigate, useParams } from "react-router-dom";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchItemData = async () => {
    if (id) {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get(`/api/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFormData({
          name: res.data.name,
          email: res.data.email,
          role: res.data.role,
        });
      } catch (err) {
        console.error("Error fetching item data:", err);
      }
    }
  };

  useEffect(() => {
    if (id) fetchItemData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!formData.name || !formData.email || !formData.role) {
      setError("All fields are required!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      let response;

      if (id) {
        response = await api.put(`/api/${id}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        response = await api.post("/api", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      setSuccessMessage(id ? "Entry successfully updated!" : "Entry successfully added!");
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "An error occurred. Please try again.");
      } else {
        setError("Network error. Please check your connection.");
      }
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow w-full max-w-md sm:w-80 md:w-96 lg:w-1/3"
      >
        <h2 className="text-xl font-bold mb-6 text-center">
          {id ? "Edit Entry" : "Add New Entry"}
        </h2>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        {successMessage && <p className="text-green-600 text-center mb-4">{successMessage}</p>}

        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="w-full mb-4 px-4 py-2 border rounded"
        />
        <input
          name="email"
          placeholder="Email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="w-full mb-4 px-4 py-2 border rounded"
        />
        <input
          name="role"
          placeholder="Role"
          value={formData.role}
          onChange={handleInputChange}
          required
          className="w-full mb-6 px-4 py-2 border rounded"
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          {id ? "Update" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Form;
