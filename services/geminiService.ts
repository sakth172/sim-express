
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const SYSTEM_PROMPT = `You are SIMExpress AI Assistant. 
Help users choose between JIO, Airtel, and VI. 
Explain Mobile Number Portability (MNP), eSIM technology, and SIM replacement procedures.
Keep answers concise, professional, and helpful. 
Mention that JIO is known for data value, Airtel for premium network, and VI for innovative night plans.
Be friendly and encourage the user to complete their order.`;

export const getAIResponse = async (history: ChatMessage[]) => {
  try {
    const chat = ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: history.map(h => ({
        role: h.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: h.content }]
      })),
      config: {
        systemInstruction: SYSTEM_PROMPT,
      }
    });
    
    const response = await chat;
    return response.text || "I'm sorry, I couldn't process that. Please try again.";
  } catch (error) {
    console.error("AI Assistant Error:", error);
    return "I'm having a bit of trouble connecting to my brain right now. Please ask again in a moment!";
  }
};
