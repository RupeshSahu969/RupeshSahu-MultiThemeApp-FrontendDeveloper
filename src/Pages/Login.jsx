import { useState } from "react";
import { signInFirebase, signInWithGoogle } from "../Lib/firebase";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import api from "../Api/Api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      setLoading(false);
      return;
    }

    try {

      const res = await api.post("/api/login", { email, password });
      const token = res.data.token;
      const userEmail = res.data.user.email;

      localStorage.setItem("token", token);
      localStorage.setItem("email", userEmail);
      localStorage.setItem("user", JSON.stringify({ email: userEmail }));


      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      if (err.code === "auth/invalid-email") {
        setErrorMessage("Invalid email format.");
      } else if (err.code === "auth/user-not-found") {
        setErrorMessage("No user found with this email.");
      } else if (err.code === "auth/wrong-password") {
        setErrorMessage("Wrong password.");
      } else {
        setErrorMessage("Login failed. Please check your credentials.");
      }
    }

    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result.user;

      localStorage.setItem("email", user.email);
      localStorage.setItem("user", JSON.stringify({ email: user.email }));

      navigate("/dashboard");
    } catch (err) {
      console.error("Google login error:", err);
      setErrorMessage("Google login failed.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl mb-4 font-bold text-center">Login</h2>

        <input
          className="w-full mb-3 p-2 border rounded"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="w-full mb-4 p-2 border rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          className="w-full bg-blue-600 text-white py-2 rounded mb-3"
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded hover:bg-gray-100"
          onClick={handleGoogleLogin}
        >
          <FcGoogle size={20} />
          Continue with Google
        </button>

        {errorMessage && (
          <div className="text-red-600 text-center mt-4">{errorMessage}</div>
        )}

        <div className="text-center mt-4">
          <span>Don’t have an account? </span>
          <Link to="/register" className="text-blue-600">
            Register here
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
