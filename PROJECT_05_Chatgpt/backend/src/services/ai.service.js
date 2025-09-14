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

export async function generateVectors(content) {
    const response = await ai.models.embedContent({
        model:'gemini-embedding-001',
        contents:content,
        config:{
            outputDimensionality:768
        }
    });
    return response.embeddings[0].values;
}

export default generateAiResponse;