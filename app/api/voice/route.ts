import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { prompt } = body;
  const voice = "21m00Tcm4TlvDq8ikWAM";
  try {
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
      "https://api.elevenlabs.io/v1/text-to-speech/nPczCjzI2devNBz1zQrb",
      options
    );

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
