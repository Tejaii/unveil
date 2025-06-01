import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { ThemeProvider } from "next-themes";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Profile from "./pages/profile";
import { SearchDialog } from "./components/SearchDialog";

const queryClient = new QueryClient();

const App = () => {
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
        const html = document.documentElement;
        const currentTheme = html.classList.contains("dark") ? "light" : "dark";
        html.classList.remove("light", "dark");
        html.classList.add(currentTheme);
        localStorage.setItem("theme", currentTheme);
      }

      // Handle scrolling with arrow keys
      if (e.key === "ArrowUp") {
        e.preventDefault();
        window.scrollBy(0, -100);
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        window.scrollBy(0, 100);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <SearchDialog />
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;