import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/providers/AuthProvider";
import AuthGate from "@/components/AuthGate";
import Index from "./pages/Index";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import NewPredictions from "./pages/NewPredictions";
import Teams from "./pages/Teams";
import TeamDetail from "./pages/TeamDetail";
import Matches from "./pages/Matches";
import Leagues from "./pages/Leagues";
import Dashboard from "./pages/Dashboard";
import MatchDetail from "./pages/MatchDetail";
import PredictionsView from "./pages/PredictionsView";
import ScheduledJobs from "./pages/ScheduledJobs";
import Phase9 from "./pages/Phase9";
import NotFound from "./pages/NotFound";
import CrossLeague from "./pages/CrossLeague";
import Analytics from "./pages/Analytics";
import Models from "./pages/Models";
import Monitoring from "./pages/Monitoring";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public routes - no auth required */}
            <Route path="/" element={<AuthGate requireAuth={false}><Index /></AuthGate>} />
            <Route path="/login" element={<AuthGate requireAuth={false}><Login /></AuthGate>} />
            <Route path="/signup" element={<AuthGate requireAuth={false}><Signup /></AuthGate>} />
            
            {/* Demo routes - accessible to all (read-only for unauthenticated) */}
            <Route path="/predictions" element={<AuthGate requireAuth={false}><PredictionsView /></AuthGate>} />
            <Route path="/matches" element={<AuthGate requireAuth={false}><Matches /></AuthGate>} />
            <Route path="/match/:id" element={<AuthGate requireAuth={false}><MatchDetail /></AuthGate>} />
            <Route path="/teams" element={<AuthGate requireAuth={false}><Teams /></AuthGate>} />
            <Route path="/teams/:teamName" element={<AuthGate requireAuth={false}><TeamDetail /></AuthGate>} />
            <Route path="/leagues" element={<AuthGate requireAuth={false}><Leagues /></AuthGate>} />
            
            {/* Protected routes - require authentication */}
            <Route path="/predictions/new" element={<AuthGate><NewPredictions /></AuthGate>} />
            <Route path="/dashboard" element={<AuthGate><Dashboard /></AuthGate>} />
            <Route path="/analytics" element={<AuthGate><Analytics /></AuthGate>} />
            <Route path="/monitoring" element={<AuthGate><Monitoring /></AuthGate>} />
            <Route path="/models" element={<AuthGate><Models /></AuthGate>} />
            <Route path="/crossleague" element={<AuthGate><CrossLeague /></AuthGate>} />
            <Route path="/jobs" element={<AuthGate allowedRoles={['admin', 'analyst']}><ScheduledJobs /></AuthGate>} />
            <Route path="/phase9" element={<AuthGate><Phase9 /></AuthGate>} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
