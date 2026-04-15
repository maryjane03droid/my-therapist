import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navBar";
import Home from "./pages/home";
import Mood from "./pages/mood";
import Footer from "./components/Footer";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mood" element={<Mood />} />
        

      </Routes>
    
    </BrowserRouter>
    
  );
}