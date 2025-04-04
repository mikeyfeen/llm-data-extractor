# Project Overview

Paste your project requirements and let AI sort them into a table including:

 - Features
 - Description
 - Category
 - Dependencies

Each extraction costs 1 credit, and users start with 20 credits. Once credits are used up, the app prompts the user to purchase more. Includes a theme toggle for light and dark mode.

# Tech Stack

 - **Frontend**: Next.js, TailwindCSS, shadcn/ui
 - **Backend**: Next.js API
 - **State Management**: React Context API
 - **AI integration**: Google Gemini API
 - **Deployment**: Vercel

## Setup & Running Instructions

 1. Clone the repository 
 2. `cd llm-data-extractor`
 3.  Run `node -v` and ensure it's v18+
 4. `npm install`
 5.  Create a `.env` file the root directory and add your gemini api key into variable: `GEMINI_API_KEY=your_api_key`
 6. `npm run dev`

## Link to Deployed Version

https://llm-data-extractor.vercel.app/