import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Initialize theme from localStorage or system preference
const initializeTheme = () => {
  if (typeof window !== 'undefined') {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const defaultTheme = isDark ? 'dark' : 'light';
    const theme = localStorage.getItem('theme') || defaultTheme;
    document.documentElement.classList.add(theme);
  }
};

initializeTheme();
createRoot(document.getElementById("root")!).render(<App />);