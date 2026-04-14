import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navBar";
import Home from "./pages/home";

function Counseling() {
  return <h2 style={{ padding: "40px" }}>Counseling Page</h2>;
}

function Journal() {
  return <h2 style={{ padding: "40px" }}>Journal Page</h2>;
}

function MoodTracker() {
  return <h2 style={{ padding: "40px" }}>Mood Tracker Page</h2>;
}

function Login() {
  return <h2 style={{ padding: "40px" }}>Login Page</h2>;
}

function Signup() {
  return <h2 style={{ padding: "40px" }}>Signup Page</h2>;
}

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/counseling" element={<Counseling />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/moodtracker" element={<MoodTracker />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}