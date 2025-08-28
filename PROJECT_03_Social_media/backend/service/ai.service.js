import dotenv from 'dotenv';
import { GoogleGenAI } from "@google/genai";
dotenv.config();
// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});

export async function generateCaption(base64ImageFile,language) {
  const contents = [
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: base64ImageFile,
      },
    },
  { text: "Caption this image." },
  ];
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents:contents,
    config:{
      systemInstruction:`
      You are an expert of generating captions for images.
      You generate single caption for the image.
      Your caption should be short and concise.
      You use hashtags and emojis in the caption.
      Generate caption in ${language}.
      `
    }
  });
  return response.text;
}