import { useState } from "react";
import api from "../Api/Api";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" }); 
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    if (password !== confirmPassword) {
      setMessage({ text: "Passwords do not match!", type: "error" });
      return;
    }

    setLoading(true);

    try {
      const res = await api.post("/api/register", { email, password, username });
      setMessage({ text: "Registration successful! Please login.", type: "success" });
      setTimeout(() => {
        navigate("/"); 
      }, 2000);
    } catch (err) {
      setMessage({ text: "Registration failed! Please try again.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleRegister}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl mb-4 font-bold text-center">Register</h2>
        {message.text && (
          <div
            className={`mb-4 text-center p-2 rounded ${
              message.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
            }`}
          >
            {message.text}
          </div>
        )}

        <input
          className="w-full mb-3 p-2 border rounded"
          type="text"
          placeholder="User Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="w-full mb-3 p-2 border rounded"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full mb-3 p-2 border rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          className="w-full mb-4 p-2 border rounded"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          className="w-full bg-blue-600 text-white py-2 rounded"
          type="submit"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <div className="text-center mt-4">
          <span>Already have an account? </span>
          <Link to="/" className="text-blue-600">Login here</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
