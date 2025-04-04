"use client";
import React from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useTableData } from "@/context/tableData";
import { useCredits } from "@/context/credits";

//TODO: Add form validation
const QueryForm = () => {
  const { credits, setCredits } = useCredits();
  const [formdata, setformData] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const { setTableData } = useTableData(); // Access the context's setter function

  const handleSubmit = async () => {
    // Check if formdata is not null or empty
    if (!formdata) {
      console.error("Form data is missing");
      return;
    }

    if (credits > 0) {
      setCredits(credits - 1);
    } else {
      console.error("Not enough credits");
      return;
    }

    setLoading(true); // Set loading state to true
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

      // Check if user has enough credits

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
          setLoading(false);
          throw new Error("Parsed data is not an array");
        }
      } catch (error) {
        console.error("Failed to parse API response as JSON:", error);
        setLoading(false);
        return;
      }
      // Update the table data context
      setTableData(parsedData);
      setLoading(false); // Set loading state to false
    } catch (error) {
      setLoading(false); // Set loading state to false
      console.error("Error fetching data:", error);
    }
  };

  return credits > 0 ? (
    <>
      <Textarea
        placeholder="Describe your project features here..."
        onChange={(e) => setformData(e.target.value)}
      />
      <div className="text-sm text-gray-500 text-center">
        <span className="font-bold">Note:</span> The more detailed your query,
        the better the results. <br /> You have {credits} credits left.
      </div>
      <Button disabled={loading} className="mt-2" onClick={handleSubmit}>
        {loading ? "Loading..." : "Send"}
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
      <div className="text-sm text-gray-500 text-center">
        <span className="font-bold">Note:</span> You've reached the limit.
        Please purchase more credits to continue.
      </div>
      <Button disabled>Send</Button>
    </>
  );
};

export default QueryForm;
