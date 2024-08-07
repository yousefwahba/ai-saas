import { google } from "@ai-sdk/google";
import { convertToCoreMessages, streamText } from "ai";
import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthorized.", { status: 401 });

    if (!messages)
      return new NextResponse("Messages are required.", { status: 400 });

    const freeTrial = await checkApiLimit();
    if (!freeTrial) {
      return new NextResponse("API limit exceeded.", { status: 403 });
    }
    const result = await streamText({
      model: google("models/gemini-1.5-pro-latest"),
      system:
        "you are a gode generator. you must answer only in markdown code snippets. Use code comments for explanations",
      messages: convertToCoreMessages(messages),
    });

    await increaseApiLimit();

    return result.toAIStreamResponse();
  } catch (error) {
    return new NextResponse("Internal server error.", { status: 500 });
  }
}
