import express from "express";
import fetch from "node-fetch";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const API_KEY = "AIzaSyDcnHrEgO6HqSIHfH0Lv82LO1rIoqGkZFI"; // Pon aquí tu API Key

app.post("/chat", async (req, res) => {
  try {
    const prompt = req.body.message;

    // Forzar que Gemini solo hable de Comunicación
    const finalPrompt = `
      Responde únicamente sobre temas relacionados con Comunicación.
      Sé claro, educativo y usa ejemplos.
      Pregunta del usuario: ${prompt}
    `;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: finalPrompt }] }],
        }),
      }
    );

    const data = await response.json();
    res.json({ reply: data.candidates[0].content.parts[0].text });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("Servidor escuchando en puerto 3000");
});
