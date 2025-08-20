import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import VolcanoesNationalPark from "./pages/VolcanoesNationalPark";
import TwinLakes from "./pages/TwinLakes";
import MusanzeCaves from "./pages/MusanzeCaves";
import CulturalVillages from "./pages/CulturalVillages";
import BookingPage from "./pages/BookingPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/volcanoes-national-park" element={<VolcanoesNationalPark />} />
          <Route path="/twin-lakes" element={<TwinLakes />} />
          <Route path="/musanze-caves" element={<MusanzeCaves />} />
          <Route path="/cultural-villages" element={<CulturalVillages />} />
          <Route path="/booking" element={<BookingPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
