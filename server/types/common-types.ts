interface GeneratePromptPayload {
  ingredients: string;
  servingSize: string;
  mealType: string;
  cuisine: string;
  cookingTime: string;
  difficultyLevel: string;
}

type ResponseData = {
  action: "start" | "stop" | "error" | "close" | "chunk";
  chunk?: string | null;
  message?: string;
};

export type { GeneratePromptPayload, ResponseData };
