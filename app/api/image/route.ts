import { auth } from "@clerk/nextjs/server";
import { type NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";
import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();

    const body = await req.json();
    const { prompt } = body;

    if (!userId) return new NextResponse("Unauthorized.", { status: 401 });

    if (!prompt)
      return new NextResponse("Prompt is required.", { status: 400 });

    const input = {
      cfg: 3.5,
      steps: 28,
      prompt: prompt,
      aspect_ratio: "3:2",
      output_format: "webp",
      output_quality: 90,
      negative_prompt: "",
      prompt_strength: 0.85,
    };

    const freeTrial = await checkApiLimit();
    if (!freeTrial) {
      return new NextResponse("API limit exceeded.", { status: 403 });
    }

    const output = await replicate.run("stability-ai/stable-diffusion-3", {
      input,
    });

    await increaseApiLimit();

    return NextResponse.json(output, { status: 200 });
  } catch (error: unknown) {
    console.error("[IMAGE_ERROR]: ", error);
    return new NextResponse("Internal server error.", { status: 500 });
  }
}
