"use client";
import React, { createContext, useState, useContext } from "react";
import { Feature } from "@/types/feature";

// Create the context
export const TableDataContext = createContext<{
  tableData: Array<Feature>;
  setTableData: React.Dispatch<React.SetStateAction<Array<Feature>>>;
}>({
  tableData: [],
  setTableData: () => {},
});

// Create a provider component
export const TableDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tableData, setTableData] = useState<Array<Feature>>([]);

  return (
    <TableDataContext.Provider value={{ tableData, setTableData }}>
      {children}
    </TableDataContext.Provider>
  );
};

// Custom hook for consuming the context
export const useTableData = () => {
  const context = useContext(TableDataContext);
  if (!context) {
    throw new Error("useTableData must be used within a TableDataProvider");
  }
  return context;
};