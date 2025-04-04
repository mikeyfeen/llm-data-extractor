"use client";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import Table from "@/components/Table";
import { Button } from "@/components/ui/button";
import QueryForm from "@/components/QueryForm";
import { TableDataProvider } from "@/context/tableData";
import { CreditsProvider } from "@/context/credits";
import { ThemeProvider } from "@/context/theme";
import Header from "@/components/Header";
import TableComponent from "@/components/Table";

export default function Home() {

  // This is the main entry point of the application
  return (
    <ThemeProvider>
      <TableDataProvider>
        <Header />
        <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
          <div className="flex flex-col items-center justify-center gap-4">
            <h1 className="text-3xl font-bold text-center">
              Project Requirement Extraction
            </h1>
            <p className="text-center text-gray-500">
              Paste your project requirements here and let the AI extract the
              features for you.
            </p>
            <CreditsProvider>
              <QueryForm />
            </CreditsProvider>
          </div>
          <div className="w-full max-h-96 overflow-x-auto">
            <TableComponent />
          </div>
        </div>
      </TableDataProvider>
    </ThemeProvider>
  );
}
