import { google } from "@ai-sdk/google";
import { convertToCoreMessages, streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = await streamText({
    model: google("models/gemini-1.5-pro-latest"),
    system:
      "you are a gode generator. you must answer only in markdown code snippets. Use code comments for explanations",
    messages: convertToCoreMessages(messages),
  });

  return result.toAIStreamResponse();
}
