export interface IRecipeGenerator {
  /**
   * Generates a recipe from an optional image and standard text instruction (e.g. selected country).
   * @param image - The drag & dropped ingredient photo
   * @param country - The selected country style
   * @returns A promise resolving to the markdown string of the generated recipe
   */
  generateRecipe(image: File | null, country: string): Promise<string>;
}
