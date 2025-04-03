"use client";
import React from 'react'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { useTableData } from "@/context/tableData"; 

//TODO: Add form validation
const QueryForm = () => {
  const [formdata, setformData] = React.useState<string | null>(null);
  const { setTableData } = useTableData(); // Access the context's setter function

  const handleSubmit = async () => {

    if (!formdata) {
      console.error("Form data is missing");
      return;
    }
    try {
      const response = await fetch("/api/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
      });
  
      if (!response.ok) {
        console.error("Failed to send query");
        return;
      }
  
      // Read the response as text
      const rawData = await response.text();
      console.log("Raw API Response:", rawData); // Log the raw response for debugging
  
      // Parse the raw JSON string
      let parsedData;
      try {
        // First parse the rawData to get the JSON string
        const jsonString = JSON.parse(rawData);
  
        // Then parse the JSON string to get the array
        parsedData = JSON.parse(jsonString);
  
        // Ensure the parsed data is an array
        if (!Array.isArray(parsedData)) {
          throw new Error("Parsed data is not an array");
        }
      } catch (error) {
        console.error("Failed to parse API response as JSON:", error);
        return;
      }
  
      console.log("Parsed Data:", parsedData); // Log the parsed data for debugging
  
      // Update the table data context
      setTableData(parsedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
return (
  <>
    <Textarea
      placeholder="Describe your project features here..."
      onChange={(e) => setformData(e.target.value)}
    />
    <Button onClick={handleSubmit}>Send</Button>
  </>
);
};

export default QueryForm