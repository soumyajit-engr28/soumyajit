import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Input from "../components/input";

const Details = () => {
  const navigate = useNavigate();

  // 🔥 State
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [error, setError] = useState("");

  // ✅ Handle Continue
  const handleNext = () => {
    if (!age || !weight || !height) {
      setError("⚠ Please fill all details");
      return;
    }

    if (age <= 0 || weight <= 0 || height <= 0) {
      setError("⚠ Enter valid positive values");
      return;
    }

    setError("");

    // 💾 Save details
    const existingUser =
      JSON.parse(localStorage.getItem("user")) || {};

    const updatedUser = {
      ...existingUser,
      age,
      weight,
      height,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));

    navigate("/gender");
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
            Your Details 📊
          </h1>

          {/* Inputs */}
          <div className="flex flex-col gap-4">
            <Input
              placeholder="Age"
              value={age}
              onChange={(e) => {
                setAge(e.target.value);
                setError("");
              }}
            />

            <Input
              placeholder="Weight (kg)"
              value={weight}
              onChange={(e) => {
                setWeight(e.target.value);
                setError("");
              }}
            />

            <Input
              placeholder="Height (cm)"
              value={height}
              onChange={(e) => {
                setHeight(e.target.value);
                setError("");
              }}
            />
          </div>

          {/* ❌ Error */}
          {error && (
            <p className="text-red-400 text-sm mt-3 text-center">
              {error}
            </p>
          )}

          {/* Button */}
          <button
            onClick={handleNext}
            disabled={!age || !weight || !height}
            className="mt-6 w-full py-3 rounded-xl text-lg font-semibold 
            bg-gradient-to-r from-blue-500 to-cyan-400 
            shadow-lg shadow-blue-500/30
            hover:scale-105 hover:shadow-blue-500/50 
            disabled:opacity-40 disabled:cursor-not-allowed
            active:scale-95
            transition duration-300"
          >
            Continue →
          </button>

        </motion.div>
      </div>
    </div>
  );
};

export default Details;