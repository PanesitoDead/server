import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { chatRequestSchema } from "@shared/schema";
import { GoogleGenAI } from "@google/genai";


export async function registerRoutes(app: Express): Promise<Server> {
  // Chat endpoint for Gemini AI integration
  app.post("/api/chat", async (req, res) => {
    try {
      // Validate request body
      const validation = chatRequestSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ 
          error: "Invalid request body",
          details: validation.error.errors 
        });
      }

      const { message } = validation.data;

      // Get API key from environment variables with fallbacks
      const API_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || process.env.API_KEY;
      
      if (!API_KEY) {
        return res.status(500).json({ 
          error: "API key not configured. Please set GEMINI_API_KEY environment variable." 
        });
      }

      // Initialize Google GenAI
      const ai = new GoogleGenAI({ apiKey: API_KEY });

      // Force Gemini to only talk about Communication topics
      const finalPrompt = `
        Responde únicamente sobre temas relacionados con Comunicación.
        Sé claro, educativo y usa ejemplos prácticos.
        Si la pregunta no está relacionada con comunicación, responde amablemente que solo puedes ayudar con temas de comunicación.
        Pregunta del usuario: ${message}
      `;

      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash-exp",
        contents: finalPrompt,
      });

      const reply = response.text || "Lo siento, no pude procesar tu pregunta. Inténtalo de nuevo.";
      res.json({ reply });

    } catch (err: any) {
      console.error("Chat endpoint error:", err);
      res.status(500).json({ 
        error: "Ha ocurrido un error interno. Por favor, inténtalo de nuevo." 
      });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  const httpServer = createServer(app);
  return httpServer;
}
