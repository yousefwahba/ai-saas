import * as z from "zod";

export const voiceFormSchema = z.object({
  prompt: z.string().min(1, {
    message: "voice prompt is required.",
  }),
});
