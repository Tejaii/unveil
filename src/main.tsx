import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Initialize theme from localStorage or default to light mode
const initializeTheme = () => {
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('theme');
    
    // Default to light mode as requested
    let theme = 'light';
    
    if (savedTheme) {
      theme = savedTheme;
    }
    
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }
};

initializeTheme();
createRoot(document.getElementById("root")!).render(<App />);