import dotenv from 'dotenv';
import { GoogleGenAI } from "@google/genai";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
dotenv.config()
const ai = new GoogleGenAI({});

async function generateResponse(prompt){
   const response  = await ai.models.generateContent({
    model:'gemini-2.0-flash',
    contents:prompt
   });
   return response.text;
}

export default generateResponse;