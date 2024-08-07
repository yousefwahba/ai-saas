import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt } = body;
    const voice = "ErXwobaYiN019PkySvjV";

    if (!userId) return new NextResponse("Unauthorized.", { status: 401 });

    if (!prompt)
      return new NextResponse("Prompt is required.", { status: 400 });

    const freeTrial = await checkApiLimit();
    if (!freeTrial) {
      return new NextResponse("API limit exceeded.", { status: 403 });
    }
    const options = {
      method: "POST",
      headers: {
        Accept: "audio/mpeg",
        "Content-Type": "application/json",
        "xi-api-key": process.env.ELEVEN_LABS_API_KEY as string,
      },
      body: JSON.stringify({
        text: prompt,
        model_id: "eleven_monolingual_v1",
      }),
    };

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voice}`,
      options
    );

    await increaseApiLimit();

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const audioBuffer = await response.arrayBuffer();

    return new Response(audioBuffer, {
      headers: {
        "Content-Type": "audio/mpeg",
      },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}
