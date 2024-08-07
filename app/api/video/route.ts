import { auth } from "@clerk/nextjs/server";
import { type NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";
import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();

    const body = await req.json();
    const { prompt } = body;

    if (!userId) return new NextResponse("Unauthorized.", { status: 401 });

    if (!prompt)
      return new NextResponse("Prompt is required.", { status: 400 });

    const freeTrial = await checkApiLimit();
    if (!freeTrial) {
      return new NextResponse("API limit exceeded.", { status: 403 });
    }

    const response = await replicate.run(
      "cjwbw/damo-text-to-video:1e205ea73084bd17a0a3b43396e49ba0d6bc2e754e9283b2df49fad2dcf95755",
      {
        input: {
          fps: 8,
          prompt,
          num_frames: 50,
          num_inference_steps: 50,
        },
      }
    );

    await increaseApiLimit();
    return NextResponse.json(response, { status: 200 });
  } catch (error: unknown) {
    console.error("[VIDEO_ERROR]: ", error);
    return new NextResponse("Internal server error.", { status: 500 });
  }
}
