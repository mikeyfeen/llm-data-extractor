"use client";
import React from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useTableData } from "@/context/tableData";
import { useCredits } from "@/context/credits";

//TODO: Add form validation
const QueryForm = () => {
  const { credits, setCredits, loading } = useCredits();
  const [formdata, setformData] = React.useState<string | null>(null);
  const [loadingSubmit, setLoadingSubmit] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const { setTableData } = useTableData(); // Access the context's setter function

  if (loading) {
    return <div>Loading...</div>; // Handle loading state for credits
  }

  const handleSubmit = async () => {
    // Check if formdata is not null or empty
    if (!formdata) {
      setError("Please enter a valid query.");
      console.error("Form data is missing");
      return;
    }

    // Check if credits are available
    if (credits !== null && credits > 0) {
      setCredits(credits - 1);
      localStorage.setItem("credits", (credits - 1).toString());
    } else {
      console.error("Not enough credits");
      return;
    }

    setLoadingSubmit(true); // Set loading state to true
    try {
      const response = await fetch("/api/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
      });

      if (!response.ok) {
        setLoadingSubmit(false); // Set loading state to false
        setError("Failed to send query. Please try again.");
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
          setError(
            "Failed to parse data. Please try again. Make sure your input is detailed enough."
          );
          setLoadingSubmit(false);
          throw new Error("Parsed data is not an array");
        }
      } catch (error) {
        setError(
          "Failed to parse data. Please try again. Make sure your input is detailed enough."
        );
        console.error("Failed to parse API response as JSON:", error);
        setLoadingSubmit(false);
        return;
      }
      // Update the table data context
      setTableData(parsedData);
      setLoadingSubmit(false); // Set loading state to false
      setError(null); // Clear any previous error
    } catch (error) {
      setLoadingSubmit(false); // Set loading state to false
      console.error("Error fetching data:", error);
    }
  };

  return credits !== null && credits > 0 ? (
    <>
      {error && <p className="text-red-500 text-xs">{error}</p>}
      <Textarea
        className="w-full h-32"
        placeholder="Describe your project features here..."
        onChange={(e) => setformData(e.target.value)}
      />
      <div className="text-sm text-gray-500 text-center">
        <span className="font-bold">Note:</span> The more detailed your query,
        the better the results. <br /> You have {credits} credits left.
      </div>
      <Button disabled={loadingSubmit} className="mt-2" onClick={handleSubmit}>
        {loadingSubmit ? "Loading..." : "Send"}
      </Button>
      <div className=" border-b-2 p-0 m-0">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </div>
    </>
  ) : (
    <>
      <Textarea
        placeholder="Describe your project features here..."
        onChange={(e) => setformData(e.target.value)}
      />
      <div className="text-sm text-red-400 text-center">
        You've reached the limit. Please purchase more credits to continue.
      </div>
      <Button disabled>Send</Button>
    </>
  );
};

export default QueryForm;
