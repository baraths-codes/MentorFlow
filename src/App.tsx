import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MentorProvider } from "@/contexts/MentorContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Roadmap from "./pages/Roadmap";
import Tasks from "./pages/Tasks";
import SkillAnalysis from "./pages/SkillAnalysis";
import SettingsPage from "./pages/Settings";
import Mentor from "./pages/Mentor";
import AppLayout from "./components/AppLayout";

const queryClient = new QueryClient();

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/dashboard" element={<AppLayout><Dashboard /></AppLayout>} />
      <Route path="/roadmap" element={<AppLayout><Roadmap /></AppLayout>} />
      <Route path="/tasks" element={<AppLayout><Tasks /></AppLayout>} />
      <Route path="/skills" element={<AppLayout><SkillAnalysis /></AppLayout>} />
      <Route path="/mentor" element={<AppLayout><Mentor /></AppLayout>} />
      <Route path="/settings" element={<AppLayout><SettingsPage /></AppLayout>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <MentorProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </MentorProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
