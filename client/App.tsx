import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Learning from "./pages/Learning";
import Labs from "./pages/Labs";
import QubitLab from "./pages/QubitLab";
import GatesLab from "./pages/GatesLab";
import EntanglementLab from "./pages/EntanglementLab";
import NoiseLab from "./pages/NoiseLab";
import Mentor from "./pages/Mentor";
import Settings from "./pages/Settings";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/learning" element={<Learning />} />
          <Route path="/labs" element={<Labs />} />
          <Route path="/labs/qubit" element={<QubitLab />} />
          <Route path="/labs/gates" element={<GatesLab />} />
          <Route path="/labs/entanglement" element={<EntanglementLab />} />
          <Route path="/labs/noise" element={<NoiseLab />} />
          <Route path="/mentor" element={<Mentor />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/about" element={<About />} />
          {/* Catch all - must be last */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
