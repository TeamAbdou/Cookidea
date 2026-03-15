import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import type { IRecipeGenerator } from "../../../core/interfaces/ai-service.interface";

// ─── Helpers ────────────────────────────────────────────────────────────────

/**
 * Converts a File object to a base64 data string for the Gemini API.
 */
async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      // result is "data:<mime>;base64,<data>" – we only need <data>
      const base64 = (reader.result as string).split(",")[1];
      resolve(base64);
    };
    reader.onerror = () => reject(new Error("Failed to read the image file."));
    reader.readAsDataURL(file);
  });
}

/**
 * Builds the text prompt sent alongside the ingredient image.
 */
function buildPrompt(country: string): string {
  const cuisineType = country === 'Global / Fusion' ? 'a modern fusion' : `an authentic ${country}`;
  return `Analyze the attached image of ingredients. Based on these ingredients, generate a professional and high-quality recipe for ${cuisineType} cuisine. 
  The recipe should be clear, detailed, and respect the culinary traditions of ${country}.
  Output strictly in Markdown format including:
1. Recipe Name
2. Prep Time
3. List of detected ingredients
4. Detailed cooking steps.`;
}

/**
 * Wraps a promise with a timeout. Rejects if the promise doesn't resolve
 * within the given milliseconds.
 */
function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(
      () => reject(new Error("Request timed out. Please try again.")),
      ms
    );
    promise
      .then((value) => {
        clearTimeout(timer);
        resolve(value);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
}

/**
 * Translates raw Gemini API errors into user-friendly messages.
 * Specifically handles 429 quota errors with a retry countdown.
 */
function parseApiError(err: unknown): Error {
  const message = err instanceof Error ? err.message : String(err);

  // 429 quota exceeded — extract retry delay if present
  if (message.includes("429") || message.toLowerCase().includes("quota")) {
    const retryMatch = message.match(/(\d+)s/);
    const retrySec = retryMatch ? parseInt(retryMatch[1], 10) : null;
    const retryHint = retrySec
      ? ` Please retry in ${Math.ceil(retrySec / 60)} minute(s).`
      : " Please try again in a few minutes.";
    return new Error(
      `⚡ API quota exceeded for today's free tier.${retryHint}`
    );
  }

  // Propagate everything else as-is
  return err instanceof Error ? err : new Error(message);
}

// ─── Service ────────────────────────────────────────────────────────────────

const TIMEOUT_MS = 30_000; // 30-second timeout

export class GeminiService implements IRecipeGenerator {
  private readonly genAI: GoogleGenerativeAI;

  constructor() {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (!apiKey || apiKey === "YOUR_API_KEY_HERE") {
      throw new Error(
        "Gemini API key is missing. Please set VITE_GEMINI_API_KEY in your .env file."
      );
    }

    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  public async generateRecipe(
    image: File | null,
    country: string
  ): Promise<string> {
    if (!image) {
      throw new Error(
        "Please upload a photo of your ingredients before generating."
      );
    }

    const model = this.genAI.getGenerativeModel({
      model: "gemini-3.1-flash-lite-preview",
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
      ],
    });

    // Convert image to base64
    const base64Data = await fileToBase64(image);

    const imagePart = {
      inlineData: {
        data: base64Data,
        mimeType: image.type || "image/jpeg",
      },
    };

    const prompt = buildPrompt(country);

    // Call Gemini with a 30-second timeout, with quota-aware error handling
    let result;
    try {
      result = await withTimeout(
        model.generateContent([prompt, imagePart]),
        TIMEOUT_MS
      );
    } catch (err) {
      throw parseApiError(err);
    }

    const response = result.response;
    const text = response.text();

    if (!text || text.trim().length === 0) {
      throw new Error(
        "Please upload a clearer photo of your ingredients."
      );
    }

    // Check if Gemini couldn't identify ingredients
    const lowerText = text.toLowerCase();
    if (
      lowerText.includes("no ingredients found") ||
      lowerText.includes("cannot identify") ||
      lowerText.includes("unable to detect")
    ) {
      throw new Error(
        "Please upload a clearer photo of your ingredients."
      );
    }

    return text;
  }
}

// Export a singleton instance
export const recipeGeneratorService = new GeminiService();
