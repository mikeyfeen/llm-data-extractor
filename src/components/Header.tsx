import React from "react";
import ThemeToggle from "./ThemeToggle";
import { useEffect } from "react";

const Header = () => {
  useEffect(() => {
    // Access localStorage after the component has mounted
    const theme = localStorage.getItem("theme");

    if (theme === "dark") {
      document.documentElement.style.setProperty("--header-color", "#333");
    } else {
      document.documentElement.style.setProperty("--header-color", "#fff");
    }
  }, []); // Empty dependency array ensures this runs only once on mount
  return (
    <header className="flex items-center justify-between p-4 bg-[var(--geist-header-color)]">
      <ThemeToggle />
    </header>
  );
};

export default Header;
