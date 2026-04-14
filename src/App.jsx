import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Chat from "./pages/chat";
import Mood from "./pages/mood";
import Journal from "./pages/journal";
import Groups from "./pages/supportGroup";
import Profile from "./pages/profile";
import Auth from "./pages/auth";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/mood" element={<Mood />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}