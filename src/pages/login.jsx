import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Input from "../components/input";
import API from "../api";   // ✅ Axios helper

const Login = () => {
  const navigate = useNavigate();

  // 🔥 State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Handle Login
  const handleLogin = async () => {
    if (!email || !password) {
      setError("⚠ Please enter email and password");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // Call backend login route
      const res = await API.post("/login", { email, password });

      // Save JWT token in localStorage
      localStorage.setItem("token", res.data.token);

      console.log("Login successful, token saved:", res.data.token);

      // Navigate to dashboard after successful login
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full relative overflow-hidden text-white">
      {/* 🎥 Background */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-[3px]"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1599058917212-d750089bc07d?auto=format&fit=crop&w=1920&q=80')",
        }}
      />

      {/* 🌑 Overlay */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* 💡 Glow */}
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="w-[500px] h-[500px] bg-indigo-500/20 blur-[120px] rounded-full"></div>
      </div>

      {/* 💪 Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md p-8 md:p-10 
          bg-white/10 backdrop-blur-xl 
          border border-white/20 
          rounded-2xl shadow-2xl"
        >
          {/* 🔥 Heading */}
          <h1 className="text-3xl md:text-4xl font-extrabold text-center 
          bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400 
          bg-clip-text text-transparent mb-6">
            Welcome Back 👋
          </h1>

          {/* Inputs */}
          <div className="flex flex-col gap-4">
            <Input
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
            />
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
            />
          </div>

          {/* ❌ Error Message */}
          {error && (
            <p className="text-red-400 text-sm mt-3 text-center">
              {error}
            </p>
          )}

          {/* Button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="mt-6 w-full py-3 rounded-xl text-lg font-semibold 
            bg-gradient-to-r from-indigo-500 to-blue-400 
            shadow-lg shadow-indigo-500/30
            hover:scale-105 hover:shadow-indigo-500/50 
            disabled:opacity-40 disabled:cursor-not-allowed
            active:scale-95
            transition duration-300"
          >
            {loading ? "Logging in..." : "Login →"}
          </button>

          {/* 🔁 Back to Signup */}
          <p className="text-center text-gray-400 mt-4 text-sm">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-indigo-400 cursor-pointer hover:underline"
            >
              Signup
            </span>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;