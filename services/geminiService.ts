
import { GoogleGenAI, Type } from "@google/genai";
import { QuizQuestion } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const quizSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      question: {
        type: Type.STRING,
        description: "The quiz question in Spanish.",
      },
      options: {
        type: Type.ARRAY,
        items: {
          type: Type.STRING,
        },
        description: "An array of 3 possible answers in Spanish.",
      },
      correctAnswer: {
        type: Type.STRING,
        description: "The correct answer, which must be one of the strings from the 'options' array.",
      },
    },
    required: ["question", "options", "correctAnswer"],
  },
};

export async function generateQuizQuestions(): Promise<QuizQuestion[]> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Genera 7 preguntas sencillas tipo test, en español, sobre la Orden de Calatrava. Cada pregunta debe tener 3 opciones de respuesta, y una de ellas debe ser la correcta.",
      config: {
        responseMimeType: "application/json",
        responseSchema: quizSchema,
      },
    });

    const jsonText = response.text.trim();
    const questions = JSON.parse(jsonText) as QuizQuestion[];
    
    // Simple validation
    if (!Array.isArray(questions) || questions.length === 0) {
        throw new Error("API did not return a valid array of questions.");
    }

    return questions;
  } catch (error) {
    console.error("Error generating quiz questions:", error);
    throw new Error("Failed to fetch quiz questions from Gemini API.");
  }
}
