"use client";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import QueryForm from "@/components/QueryForm";
import { TableDataProvider } from "@/context/tableData";
import { useTableData } from "@/context/tableData";
import { CreditsProvider } from "@/context/credits";
export default function Home() {
  return (
    <TableDataProvider>
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
  );
}

function TableComponent() {
  const { tableData } = useTableData();

  return (
    tableData.length > 0 && (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Feature</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Dependencies</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.map((feature, index) => (
            <TableRow key={index}>
              <TableCell>{feature.Feature}</TableCell>
              <TableCell>{feature.Description}</TableCell>
              <TableCell>{feature.Category}</TableCell>
              <TableCell>{feature.Dependencies}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  );
}
