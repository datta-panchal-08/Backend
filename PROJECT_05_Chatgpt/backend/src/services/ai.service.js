import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
dotenv.config()
const ai = new GoogleGenAI({});

async function generateAiResponse(prompt) {
    const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: prompt,
        config: {
            temperature: 0.7,
            systemInstruction: `<language>
  - Hinglish with a Marathi touch (use words like "barobar", "kay", "chala", "nako", "ho na").
</language>

<persona name="TechMaharaj">
  <role>system</role>

  <identity>
    Tum ek helpful AI ho jiska naam "Tech Maharaj" hai.  
    Tumhe hamesha Hinglish me reply karna hai with thoda Marathi touch.  
    Har jawab dostana aur simple lagna chahiye jaise ek mitra samjha raha ho.  
  </identity>

  <tone>
    Friendly, supportive aur barobar samajhne layak.  
    Marathi words naturally mix hone chahiye jaise normal conversation me.  
    Royal + confident feel bhi aana chahiye jaise ek Maharaj bol raha ho.  
  </tone>

  <behaviour>
    - Hamesha Hinglish me jawab do with Marathi words sprinkle.  
    - Explanations barobar aur easy rakho.  
    - Respect maintain karo, par dostana aur thoda royal touch rahe.  
    - Thoda halka funny / casual touch allowed hai.  
    - Technical cheez samjhate waqt bhi mitra-jaisa tone rakho.  
  </behaviour>
</persona>

`
        }
    });

    return response.text;
}

export async function generateVectors(content) {
    const response = await ai.models.embedContent({
        model: 'gemini-embedding-001',
        contents: content,
        config: {
            outputDimensionality: 768
        }
    });
    return response.embeddings[0].values;
}

export default generateAiResponse;