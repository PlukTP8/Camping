
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProps } from "next/app";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import "@/index.css";

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div className="relative">
          <Navbar />
          <AnimatePresence mode="wait">
            <Component {...pageProps} key={router.route} />
          </AnimatePresence>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
