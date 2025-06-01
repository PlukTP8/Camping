
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import ZoneDetails from "./pages/ZoneDetails";
import Booking from "./pages/Booking";
import Bookings from "./pages/Bookings";
import Info from "./pages/Info";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Zones from "./pages/Zones";
import Payment from "./pages/Payment";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/zones" element={<Zones />} />
            <Route path="/zones/:id" element={<ZoneDetails />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/info" element={<Info />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/payment" element={<Payment />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
