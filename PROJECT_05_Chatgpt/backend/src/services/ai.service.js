import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
dotenv.config()
const ai = new GoogleGenAI({});

async function generateAiResponse(prompt) {
    const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: prompt,
    });

    return response.text;
}

export default generateAiResponse;