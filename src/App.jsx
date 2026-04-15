import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Details from "./pages/details";
import Dashboard from "./pages/dashboard";
import Gender from "./pages/gender";
import Level from "./pages/level";
import Welcome from "./pages/welcome";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/details" element={<Details />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/gender" element={<Gender />} />
        <Route path="/level" element={<Level />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;