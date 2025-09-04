import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import VolcanoesNationalPark from "./pages/VolcanoesNationalPark";
import TwinLakes from "./pages/TwinLakes";
import MusanzeCaves from "./pages/MusanzeCaves";
import CulturalVillages from "./pages/CulturalVillages";
import BookingPage from "./pages/BookingPage";
import AdminLogin from "./pages/AdminLogin";
import AdminLayout from "./pages/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import { AuthProvider } from "./hooks/useAuth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={
              <>
                <Navigation />
                <Index />
              </>
            } />
            <Route path="/volcanoes-national-park" element={
              <>
                <Navigation />
                <VolcanoesNationalPark />
              </>
            } />
            <Route path="/twin-lakes" element={
              <>
                <Navigation />
                <TwinLakes />
              </>
            } />
            <Route path="/musanze-caves" element={
              <>
                <Navigation />
                <MusanzeCaves />
              </>
            } />
            <Route path="/cultural-villages" element={
              <>
                <Navigation />
                <CulturalVillages />
              </>
            } />
            <Route path="/booking" element={
              <>
                <Navigation />
                <BookingPage />
              </>
            } />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
            </Route>
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
