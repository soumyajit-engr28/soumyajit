import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/card";
import API from "../api";

// Icons
import {
  FaFire,
  FaChartLine,
  FaHistory,
  FaWeight,
  FaRulerVertical,
  FaDumbbell,
  FaBullseye,
  FaExclamationTriangle,
  FaSignOutAlt,
} from "react-icons/fa";

// Chart
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const Dashboard = () => {
  const navigate = useNavigate();

  const [workouts, setWorkouts] = useState([]);
  const [yesterdayData, setYesterdayData] = useState([]);
  const [warning, setWarning] = useState("");
  const [totalWorkouts, setTotalWorkouts] = useState(0);
  const [streak, setStreak] = useState(0);
  const [activeDays, setActiveDays] = useState(0);
  const [profile, setProfile] = useState(null);

  const getDate = (offset = 0) => {
    const d = new Date();
    d.setDate(d.getDate() + offset);
    return d.toISOString().split("T")[0];
  };

  useEffect(() => {
    // ✅ Fetch protected profile route
    const fetchProfile = async () => {
      try {
        const res = await API.get("/profile");
        setProfile(res.data.user);
      } catch (err) {
        console.error("Error fetching profile:", err.response?.data?.error);
        navigate("/login"); // redirect if unauthorized
      }
    };

    fetchProfile();

    // Local workout data (placeholder until backend workouts are added)
    const data = JSON.parse(localStorage.getItem("workouts")) || [];
    setWorkouts(data);

    const yesterday = getDate(-1);
    const yData = data.filter((w) => w.date === yesterday);
    setYesterdayData(yData);

    const last7Days = data.filter((w) => {
      const diff = (new Date() - new Date(w.date)) / (1000 * 60 * 60 * 24);
      return diff <= 7;
    });
    setTotalWorkouts(last7Days.length);

    const uniqueDays = new Set(last7Days.map((w) => w.date));
    setActiveDays(uniqueDays.size);

    let count = 0;
    for (let i = 0; i < 7; i++) {
      const day = getDate(-i);
      if (data.some((w) => w.date === day)) count++;
      else break;
    }
    setStreak(count);

    if (yData.length > 5) {
      setWarning("Too Much Exercise Yesterday! Take Rest");
    } else if (yData.length === 0) {
      setWarning("No Workout Yesterday! Stay Consistent");
    } else {
      setWarning("Good Job! Keep Going");
    }
  }, [navigate]);

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // 📊 Chart Data
  const getWeeklyChartData = () => {
    const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    const dataMap = { Sun:0, Mon:0, Tue:0, Wed:0, Thu:0, Fri:0, Sat:0 };

    workouts.forEach((w) => {
      const date = new Date(w.date);
      const day = days[date.getDay()];
      dataMap[day]++;
    });

    return days.map((day) => ({ day, workouts: dataMap[day] }));
  };

  const chartData = getWeeklyChartData();

  return (
    <div className="min-h-screen p-6 space-y-6 text-white
    bg-gradient-to-br from-[#0f172a] via-[#020617] to-[#020617]">

      {/* 🔝 TOP BAR */}
      <div className="flex justify-between items-center
      bg-white/5 backdrop-blur-xl border border-white/10
      p-3 rounded-2xl shadow-lg">
       
        {/* Days */}
        <div className="flex gap-3">
          {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((day) => (
            <button
              key={day}
              className="px-3 py-1 rounded-lg bg-white/5
              hover:bg-blue-500/30 hover:scale-105
              transition duration-200"
            >
              {day}
            </button>
          ))}
        </div>

        {/* Profile + Logout */}
        <div className="flex items-center gap-3
        bg-white/10 px-4 py-2 rounded-xl">
          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="text-sm font-semibold">
              {profile ? profile.email : "Loading..."}
            </p>
            <p className="text-xs text-gray-400">Authenticated User</p>
          </div>
          <button
            onClick={handleLogout}
            className="ml-4 text-red-400 hover:text-red-600 flex items-center gap-1"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <h2 className="text-xl font-semibold
            bg-gradient-to-r from-blue-400 to-purple-400
            bg-clip-text text-transparent">
              Select Your Exercise
            </h2>
          </Card>

          {/* Weekly Progress */}
          <Card>
            <h2 className="text-xl font-semibold mb-3
            bg-gradient-to-r from-blue-400 to-purple-400
            bg-clip-text text-transparent">
              Weekly Progress
            </h2>
            <div className="space-y-2 text-gray-300">
              <p className="flex items-center gap-2">
                <FaChartLine /> Total Workouts: {totalWorkouts}
              </p>
              <p className="flex items-center gap-2">
                <FaChartLine /> Consistency: {activeDays}/7 days
              </p>
              <p className="flex items-center gap-2 text-orange-400">
                <FaFire /> Streak: {streak} days
              </p>
            </div>
          </Card>

          {/* 📊 Chart */}
          <Card>
            <h2 className="text-xl font-semibold mb-3
            bg-gradient-to-r from-blue-400 to-purple-400
            bg-clip-text text-transparent">
              Weekly Activity Chart
            </h2>
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="day" stroke="#aaa" tick={{ fill: "#ccc" }} />
                  <YAxis stroke="#aaa" tick={{ fill: "#ccc" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#020617",
                      border: "1px solid #333",
                      borderRadius: "10px",
                    }}
                    labelStyle={{ color: "#fff" }}
                    cursor={{ fill: "rgba(255,255,255,0.05)" }}
                  />
                  <Bar
                    dataKey="workouts"
                    radius={[10, 10, 0, 0]}
                    fill="url(#colorGradient)"
                    animationDuration={1200}
                    animationEasing="ease-in-out"
                  />
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity={1}/>
                      <stop offset="100%" stopColor="#9333ea" stopOpacity={0.8}/>
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Yesterday */}
          <Card>
            <h2 className="text-xl font-semibold mb-2
            bg-gradient-to-r from-blue-400 to-purple-400
            bg-clip-text text-transparent flex items-center gap-2">
              <FaHistory /> Yesterday's Activity
            </h2>
            {yesterdayData.length === 0 ? (
              <p className="text-gray-400">
                No workouts done yesterday
              </p>
            ) : (
              yesterdayData.map((w, i) => (
                <div key={i} className="text-gray-300">
                  {w.bodyPart} - {w.exercise} ({w.sets}×{w.reps})
                </div>
              ))
            )}
          </Card>

        </div>

        {/* RIGHT */}
        <div className="space-y-6">

          <Card>
            <h2 className="font-semibold">About Me</h2>
            <p className="text-gray-300 flex items-center gap-2">
              <FaWeight /> Weight: 75kg
            </p>
            <p className="text-gray-300 flex items-center gap-2">
              <FaRulerVertical /> Height: 180cm
            </p>
          </Card>

          <Card>
            <h2 className="font-semibold flex items-center gap-2">
              <FaDumbbell /> Live Exercise Counter
            </h2>
            <p className="text-3xl font-bold mt-2 text-blue-400">
              {workouts.length}
            </p>
          </Card>

          <Card>
            <h2 className="font-semibold flex items-center gap-2">
              <FaFire className="text-orange-400" /> Current Streak
            </h2>
            <p className="text-xl mt-2 text-orange-400">
              {streak} days
            </p>
          </Card>

          <Card>
            <h2 className="font-semibold flex items-center gap-2">
              <FaBullseye /> Today's Goal
            </h2>
            <p className="text-gray-300">3 Exercises</p>
            <p className="text-gray-300">300 kcal</p>
          </Card>

        </div>
      </div>

      {/* Warning */}
      <Card>
        <h2 className="text-red-400 font-semibold animate-pulse flex items-center gap-2">
          <FaExclamationTriangle /> {warning}
        </h2>
      </Card>

    </div>
  );
};
