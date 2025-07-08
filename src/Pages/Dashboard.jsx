import { useEffect, useState } from "react";
import api from "../Api/Api";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  const fetchItems = async () => {
    const token = localStorage.getItem("token");
    const res = await api.get("/api", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setItems(res.data);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    await api.delete(`/api/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchItems();
  };

  const handleEdit = (id) => {
    navigate(`/form/${id}`);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="p-4">
      <div className="flex flex-wrap justify-between mb-4">
        <h2 className="text-xl font-bold">Dashboard</h2>
        <button
          onClick={() => navigate("/form")}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          + Add New
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Email</th>
              <th className="text-left p-3">Role</th>
              <th className="text-left p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id} className="border-t">
                <td className="p-3">{item.name}</td>
                <td className="p-3">{item.email}</td>
                <td className="p-3">{item.role}</td>
                <td className="p-3 flex gap-2">
                  <FiEdit
                    onClick={() => handleEdit(item._id)}
                    className="text-blue-600 cursor-pointer"
                  />
                  <FiTrash2
                    onClick={() => handleDelete(item._id)}
                    className="text-red-600 cursor-pointer"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
