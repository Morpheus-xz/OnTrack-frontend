import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import BackgroundWrapper from "./components/BackgroundWrapper";

// Page Imports
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Onboarding from "./pages/Onboarding";
import Assessment from "./pages/Assessment";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      {/* BackgroundWrapper ensures the high-fidelity theme stays active on all routes */}
      <BackgroundWrapper>
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<Landing />} />

          {/* Auth Gateway */}
          <Route path="/auth" element={<Auth />} />

          {/* Protocol Initialization Steps */}
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/assessment" element={<Assessment />} />

          {/* Main Intelligence Hub */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Fallback Protocol: Redirect unknown paths to Landing */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BackgroundWrapper>
    </BrowserRouter>
  );
}