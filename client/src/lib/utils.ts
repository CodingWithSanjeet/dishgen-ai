import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ParsedRecipe } from "@/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Parses a recipe response string into structured data
 * Expected format:
 * Recipe Name: <name>
 * Ingredients: <ingredient1>, <ingredient2>, ...
 * Instructions: <instruction1>, <instruction2>, ...
 */
/**
 * Extracts recipe name from a line
 */
function parseRecipeName(line: string): string | undefined {
  if (line.startsWith('Recipe Name:')) {
    return line.replace('Recipe Name:', '').trim();
  }
  return undefined;
}

/**
 * Parses ingredients from the initial ingredients line
 */
function parseIngredientsLine(line: string): string[] {
  const ingredientText = line.replace('Ingredients:', '').trim();
  if (ingredientText) {
    return ingredientText.split(',').map(ingredient => ingredient.trim()).filter(ingredient => ingredient);
  }
  return [];
}

/**
 * Parses instructions from the initial instructions line
 */
function parseInstructionsLine(line: string): string[] {
  const instructionText = line.replace('Instructions:', '').trim();
  if (instructionText) {
    // For instructions, split by numbered steps (1., 2., etc.) or commas
    const stepPattern = /\d+\./;
    if (stepPattern.test(instructionText)) {
      return instructionText.split(/\d+\./).map(step => step.trim()).filter(step => step);
    } else {
      return instructionText.split(',').map(instruction => instruction.trim()).filter(instruction => instruction);
    }
  }
  return [];
}

/**
 * Adds additional ingredients from continuation lines
 */
function addIngredientsContinuation(line: string, ingredients: string[]): void {
  if (line && !line.match(/^\d+\./)) {
    const additionalIngredients = line.split(',').map(ingredient => ingredient.trim()).filter(ingredient => ingredient);
    ingredients.push(...additionalIngredients);
  }
}

/**
 * Adds additional instructions from continuation lines
 */
function addInstructionsContinuation(line: string, instructions: string[]): void {
  if (line.match(/^\d+\./)) {
    // This is a numbered instruction
    instructions.push(line.replace(/^\d+\./, '').trim());
  } else if (!line.startsWith('Recipe Name:') && !line.startsWith('Ingredients:')) {
    // This might be a continuation of the previous instruction
    if (instructions.length > 0) {
      instructions[instructions.length - 1] += ' ' + line;
    } else {
      instructions.push(line);
    }
  }
}

/**
 * Determines if a line indicates the start of a new section
 */
function getSectionType(line: string): 'recipe-name' | 'ingredients' | 'instructions' | 'none' {
  if (line.startsWith('Recipe Name:')) return 'recipe-name';
  if (line.startsWith('Ingredients:')) return 'ingredients';
  if (line.startsWith('Instructions:')) return 'instructions';
  return 'none';
}

export function parseRecipeResponse(responseText: string): ParsedRecipe {
  const lines = responseText.split('\n').map(line => line.trim()).filter(line => line);
  
  let name: string | undefined;
  let ingredients: string[] = [];
  let instructions: string[] = [];
  let currentSection: 'none' | 'ingredients' | 'instructions' = 'none';
  
  for (const line of lines) {
    const sectionType = getSectionType(line);
    
    switch (sectionType) {
      case 'recipe-name':
        name = parseRecipeName(line);
        break;
        
      case 'ingredients':
        currentSection = 'ingredients';
        const newIngredients = parseIngredientsLine(line);
        ingredients.push(...newIngredients);
        break;
        
      case 'instructions':
        currentSection = 'instructions';
        const newInstructions = parseInstructionsLine(line);
        instructions.push(...newInstructions);
        break;
        
      case 'none':
        // Handle continuation lines based on current section
        if (currentSection === 'ingredients') {
          addIngredientsContinuation(line, ingredients);
        } else if (currentSection === 'instructions') {
          addInstructionsContinuation(line, instructions);
        }
        break;
    }
  }
  
  return {
    name,
    ingredients,
    instructions
  };
}

/**
 * Parses incremental recipe chunks and maintains state
 * @param currentRecipe - The current parsed recipe state
 * @param fullText - The complete accumulated text so far (not just the new chunk)
 */
export function parseRecipeChunk(currentRecipe: ParsedRecipe, fullText: string): ParsedRecipe {
  const parsed = parseRecipeResponse(fullText);
  
  return {
    name: parsed.name || currentRecipe.name,
    ingredients: parsed.ingredients.length > 0 ? parsed.ingredients : currentRecipe.ingredients,
    instructions: parsed.instructions.length > 0 ? parsed.instructions : currentRecipe.instructions
  };
}
