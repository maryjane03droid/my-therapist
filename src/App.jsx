import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Mood from "./pages/mood";
import Journal from "./pages/journal";
import Chat from "./pages/chat";
import Profile from "./pages/profile";
import SupportGroup from "./pages/supportGroup";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mood" element={<Mood />} />

        <Route
          path="/journal"
          element={
            <ProtectedRoute>
              <Journal />
            </ProtectedRoute>
          }
        />

        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/support-group"
          element={
            <ProtectedRoute>
              <SupportGroup />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Layout>
  );
}