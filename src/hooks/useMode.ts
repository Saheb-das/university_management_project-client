// external import
import { useState, useEffect } from "react";

export const useMode = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check local storage for user preference
    const storedMode = localStorage.getItem("theme");
    if (storedMode === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleMode = () => setDarkMode((prev) => !prev);

  return { darkMode, toggleMode };
};
