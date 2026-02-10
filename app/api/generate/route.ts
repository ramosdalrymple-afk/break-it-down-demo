import { streamObject } from 'ai';
import { google } from '@ai-sdk/google';
import { planSchema } from '@/lib/schema';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const result = await streamObject({
    // UPDATED: Using the model name confirmed by your curl command
    model: google('gemini-2.5-flash'), 
    schema: planSchema,
    system: "You are an expert project manager. Break down complex goals into simple, actionable steps.",
    prompt: `Create a step-by-step plan for: ${prompt}`,
  });

  return result.toTextStreamResponse();
}