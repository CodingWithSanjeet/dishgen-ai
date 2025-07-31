import { Response } from "express";
import {
  ChatCompletionMessageParam,
  ChatCompletionChunk,
} from "openai/resources";
import { OpenAIClient } from ".";
import { ResponseData } from "../types/common-types";

const handleStreamChunk = (chunk: ChatCompletionChunk, res: Response) => {
  const choice = chunk.choices[0];
  if (choice.finish_reason === "stop") return;
  const responseData: ResponseData =
    choice.delta.role === "assistant"
      ? { action: "start" }
      : { action: "chunk", chunk: choice.delta.content };
  res.write(`data: ${JSON.stringify(responseData)}\n\n`);
};

const streamRecipeFromOpenAI = async (
  messages: ChatCompletionMessageParam[],
  res: Response
) => {
  try {
    const stream = await OpenAIClient.chat.completions.create({
      model: "gpt-4-1106-preview",
      messages,
      temperature: 1,
      stream: true,
    });
    for await (const chunk of stream) {
      handleStreamChunk(chunk, res);
    }
    res.write(
      `data: ${JSON.stringify({ action: "close" } as ResponseData)}\n\n`
    );
    res.end();
  } catch (error) {
    console.error("OpenAI API Error: ", error);
    res.write(
      `data: ${JSON.stringify({
        action: "error",
        message: "Failed to generate recipe.",
      } as ResponseData)}\n\n`
    );
    res.end();
  }
};

export { streamRecipeFromOpenAI };
