import { GoogleGenAI } from "@google/genai";

export async function POST(request: Request): Promise<Response > {
    let requestBody: string;

    try {
        // Parse the request body as text
        requestBody = await request.text();
    } catch (error) {
        console.error("Failed to parse request body:", error);
        return new Response("Invalid request body", { status: 400 });
    }

    if (!requestBody) {
        console.log("Request body is missing");
        return new Response("Request body is missing", { status: 400 });
    }

    //provide api with key
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY});

    //fetch answer from LLM API
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: "You are an expert at sorting and categorizing data. Your task is to categorize this protect data by Feature, Description, Category, and Dependencies. The data might not be given to you specifically and might require some thought. Please write the data in json format so it can be used for a table. Do not respond with anything other then the json data. Here is your first task:" + requestBody,
    });

    // Clean data by removing the Markdown code block tags
    let cleanedData = response.text.replace(/^```json\s*|\s*```$/g, "");
    
    return new Response(JSON.stringify(cleanedData), {
        headers: { "content-type": "application/json" },
    });
}




