export enum DifficultyLevel {
    easy = "easy",
    medium = "medium",
    hard = "hard",
    expert = "expert",
  }
  
  export enum CuisineType {
    indian = "indian",
    chinese = "chinese",
    italian = "italian",
    mexican = "mexican",
    french = "french",
    thai = "thai",
    greek = "greek",
    japanese = "japanese",
    american = "american",
    spanish = "spanish",
    british = "british",
    korean = "korean",
  }
  
  export enum CookingTime {
    "15-30" = "15 to 30 minutes",
    "30-60" = "30 to 60 minutes",
    "60-90" = "60 to 90 minutes",
    "90+" = "90+ minutes or more",
  }
  
  export enum MealType {
    Breakfast = "Breakfast",
    Lunch = "Lunch",
    Snack = "Snack",
    Dinner = "Dinner",
    Dessert = "Dessert",
    Appetizer = "Appetizer",
  }
  
  export type Recipe = {
    ingredients: string;
    servingSize: string;
    mealType: string;
    cuisine: CuisineType;
    cookingTime: string;
    difficultyLevel: DifficultyLevel;
  };
  
  export type RecipeFormProps = {
    onSubmit: (recipe: Recipe) => void;
    isLoading: boolean;
  };
  
  export type StreamAction = "start" | "chunk" | "close" | "error";
  
  export type StreamResponse = {
    action: StreamAction;
    chunk?: string;
    message?: string;
  };
  
export type ParsedRecipe = {
  name?: string;
  ingredients: string[];
  instructions: string[];
};

export type RecipeDisplayProps = {
  recipe: ParsedRecipe;
  isLoading: boolean;
  error: string;
  header: Recipe | null;
  height: number;
};
