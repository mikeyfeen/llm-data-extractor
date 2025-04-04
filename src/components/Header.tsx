import React from "react";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  //set header color based on theme
  const theme = localStorage.getItem("theme");

  if (theme === "dark") {
    document.documentElement.style.setProperty(
      "--geist-header-color",
      "#1a1a1a"
    );
  } else {
    document.documentElement.style.setProperty(
      "--geist-header-color",
      "#f5f5f5"
    );
  }
  return (
    <header className="flex items-center justify-between p-4 bg-[var(--geist-header-color)]">
      <ThemeToggle />
    </header>
  );
};

export default Header;
