import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Mood from "./pages/Mood";
import Journal from "./pages/Journal";
import Groups from "./pages/Groups";
import Profile from "./pages/Profile";

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
      </Routes>
    </BrowserRouter>
  );
}