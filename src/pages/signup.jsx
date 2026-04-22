import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Input from "../components/input";
import API from "../api";   // ✅ Axios helper

const Signup = () => {
  const navigate = useNavigate();

  // 🔥 State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Handle Signup
  const handleSignup = async () => {
    if (!email || !password) {
      setError("⚠ Please enter email and password");
      return;
    }

    if (password.length < 6) {
      setError("⚠ Password must be at least 6 characters");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // Call backend signup route
      const res = await API.post("/signup", {
        username: email.split("@")[0], // simple username from email
        email,
        password,
      });

      console.log(res.data); // "User created successfully"

      // Navigate to details page after successful signup
      navigate("/details");
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed");
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
            "url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1920&q=80')",
        }}
      />

      {/* 🌑 Overlay */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* 💡 Glow */}
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="w-[500px] h-[500px] bg-blue-500/20 blur-[120px] rounded-full"></div>
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
          bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 
          bg-clip-text text-transparent mb-6">
            Create Account 🚀
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
            onClick={handleSignup}
            disabled={loading}
            className="mt-6 w-full py-3 rounded-xl text-lg font-semibold 
            bg-gradient-to-r from-blue-500 to-cyan-400 
            shadow-lg shadow-blue-500/30
            hover:scale-105 hover:shadow-blue-500/50 
            disabled:opacity-40 disabled:cursor-not-allowed
            active:scale-95
            transition duration-300"
          >
            {loading ? "Creating..." : "Continue →"}
          </button>

          {/* 🔁 Back to Login */}
          <p className="text-center text-gray-400 mt-4 text-sm">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-400 cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>
        </motion.div>
      </div>
    </div>
  );
};