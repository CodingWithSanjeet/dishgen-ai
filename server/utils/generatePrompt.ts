import { GeneratePromptPayload } from "../types/common-types";

const generatePrompt = (payload: GeneratePromptPayload): string[] => {
  const {
    ingredients,
    servingSize,
    mealType,
    cuisine,
    cookingTime,
    difficultyLevel,
  } = payload;

    const prompt: string[] = [
    "Generate a recipe using only the ingredients provided below.",
    "Return the result in the following plain text format (no HTML or Markdown):",
    `Recipe Name: name of the recipe`,
    `Ingredients: ingredient1, ingredient2, ingredient3, ...`,
    `Instructions: step1, step2, step3, ...`,
    "Only return valid text with no explanation or extra content.",
    `[Ingredients: ${ingredients}]`,
    `[Serving Size: ${servingSize}]`,
    `[Meal Type: ${mealType}]`,
    `[Cuisine Preference: ${cuisine}]`,
    `[Cooking Time: ${cookingTime}]`,
    `[Difficulty Level: ${difficultyLevel}]`,
    "Name the recipe in the local language of the specified cuisine.",
    "Instructions and ingredients should be clearly separated and comma-delimited."
  ];
  
  return prompt;
};

export { generatePrompt };
