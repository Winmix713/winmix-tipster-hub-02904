import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NewPredictions from "./pages/NewPredictions";
import Teams from "./pages/Teams";
import TeamDetail from "./pages/TeamDetail";
import Matches from "./pages/Matches";
import Leagues from "./pages/Leagues";
import Dashboard from "./pages/Dashboard";
import MatchDetail from "./pages/MatchDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/predictions/new" element={<NewPredictions />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/match/:id" element={<MatchDetail />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/teams/:teamName" element={<TeamDetail />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/leagues" element={<Leagues />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
