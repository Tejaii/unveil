import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { ThemeProvider, useTheme } from "next-themes";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Profile from "./pages/profile";
import AuthCallback from "./pages/auth/callback";
import { SearchDialog } from "./components/SearchDialog";
import { AuthProvider } from "./components/auth/AuthProvider";
import { AuthGuard } from "./components/auth/AuthGuard";

const queryClient = new QueryClient();

const App = () => {
  const { setTheme } = useTheme();

  useEffect(() => {
    // Handle keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // Command/Ctrl + K for search
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        document.dispatchEvent(new CustomEvent("toggle-search"));
      }

      // Command/Ctrl + D for dark mode toggle
      if ((e.metaKey || e.ctrlKey) && e.key === "d") {
        e.preventDefault();
        setTheme(document.documentElement.classList.contains("dark") ? "light" : "dark");
      }

      // Handle scrolling with arrow keys
      if (e.key === "ArrowUp") {
        e.preventDefault();
        window.scrollBy({ top: -100, behavior: 'smooth' });
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        window.scrollBy({ top: 100, behavior: 'smooth' });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setTheme]);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <AuthGuard>
              <SearchDialog />
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/auth/callback" element={<AuthCallback />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </AuthGuard>
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;