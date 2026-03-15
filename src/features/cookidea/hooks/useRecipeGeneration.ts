import { useState } from "react";
import { recipeGeneratorService } from "../services/gemini.service";

export const useRecipeGeneration = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [resultMarkdown, setResultMarkdown] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const generate = async (image: File | null, country: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const markdown = await recipeGeneratorService.generateRecipe(image, country);
            setResultMarkdown(markdown);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to generate recipe.");
        } finally {
            setIsLoading(false);
        }
    };

    return { generate, isLoading, resultMarkdown, error };
};
