"use client";
import React, { createContext, useState, useContext, useEffect } from "react";

// Create the context
export const CreditsContext = createContext<{
  credits: number | null;
  setCredits: React.Dispatch<React.SetStateAction<number | null>>;
}>({
  credits: 0,
  setCredits: () => {},
});
// Create a provider component
export const CreditsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [credits, setCredits] = useState<number | null>(null);

  // Initialize credits from localStorage
  useEffect(() => {
    const storedCredits = localStorage.getItem("credits");
    if (storedCredits) {
      setCredits(parseInt(storedCredits, 10));
    } else {
      localStorage.setItem("credits", "20"); // Initialize if not present
    }
  }, []);

  // Update localStorage whenever credits change
  useEffect(() => {
    if (credits) {
      localStorage.setItem("credits", credits.toString());
    }
  }, [credits]);

  return (
    <CreditsContext.Provider value={{ credits, setCredits }}>
      {children}
    </CreditsContext.Provider>
  );
};
// Custom hook for consuming the context
export const useCredits = () => {
  const context = useContext(CreditsContext);
  if (!context) {
    throw new Error("useCredits must be used within a CreditsProvider");
  }
  return context;
};
