import { Request, Response } from "express";
import { GeneratePromptPayload, ResponseData } from "../types/common-types";
import { generatePrompt, streamRecipeFromOpenAI } from "../utils";
import { ChatCompletionMessageParam } from "openai/resources";

const generateRecipe = async (
  req: Request<{}, {}, GeneratePromptPayload>,
  res: Response
) => {
  // Set SSE headers first, before any validation or response writing
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const {
    ingredients,
    servingSize,
    mealType,
    cuisine,
    cookingTime,
    difficultyLevel,
  } = req.query;
  if (
    !ingredients ||
    !servingSize ||
    !cuisine ||
    !difficultyLevel ||
    !mealType ||
    !cookingTime
  ) {
    const response: ResponseData = {
      action: "error",
      message:
        "BadRequestError: Ingredients, Serving Size, Cuisine, Difficulty Level, Meal Type and Cooking Time are required.",
    };
    res.write(`data: ${JSON.stringify(response)}\n\n`);
    return res.end();
  }

  const input = {
    ingredients: String(ingredients),
    servingSize: String(servingSize),
    mealType: String(mealType),
    cuisine: String(cuisine),
    cookingTime: String(cookingTime),
    difficultyLevel: String(difficultyLevel),
  };

  const prompt = generatePrompt(input);

  const messages: ChatCompletionMessageParam[] = [
    { role: "system", content: prompt.join(" ") },
  ];
  streamRecipeFromOpenAI(messages, res);
  req.on("close", () => {
    res.end();
  });
};

export { generateRecipe };
