import { useEffect, useState, createContext } from "react";

export const ThemeContext = createContext<{
  theme: "light" | "dark";
  setTheme: React.Dispatch<React.SetStateAction<"light" | "dark">>;
}>({
  theme: "light",
  setTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // Initialize theme state
  const [theme, setTheme] = useState<"light" | "dark">("light");
  // Check localStorage for theme preference on initial render
  useEffect(() => {
    const stormedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (stormedTheme) {
      setTheme(stormedTheme as "light" | "dark");
    } else {
      setTheme(prefersDark ? "dark" : "light");
    }
  }, []);

  // Update localStorage and document class whenever theme changes
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
