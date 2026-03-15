import type { IRecipeGenerator } from "../../../core/interfaces/ai-service.interface";

export class MockGeminiService implements IRecipeGenerator {
    public async generateRecipe(image: File | null, country: string): Promise<string> {
        // Simulate API latency
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const imageStatus = image ? `with the uploaded image (${image.name})` : "without an image";

        return `
# Delicious ${country || "Global"} Style Recipe

Based on your request ${imageStatus}, we have generated a fantastic recipe prototype for you!

## Ingredients
* 2 cups of Placeholder Flour
* 1 tbsp of Mocked Spices
* 500g of AI-generated Protein

## Instructions
1. First, **prepare** the ingredients from the virtual pantry.
2. Next, combine the *Placeholder Flour* with the *Mocked Spices*.
3. Let it simmer in the digital oven for \`2000ms\`.
4. Serve hot and enjoy your placeholder meal!

> **Note:** This is a mock response from the \`MockGeminiService\`. Tomorrow's Gemini API integration will replace this output.
    `.trim();
    }
}

// Export a singleton instance
export const recipeGeneratorService = new MockGeminiService();
