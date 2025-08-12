import { NextResponse } from 'next/server';
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

type ConversationEntry = { role: string; text: string };

export async function POST(req: Request) {
  try {
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      return NextResponse.json(
        { error: 'Missing GOOGLE_GENERATIVE_AI_API_KEY in environment' },
        { status: 500 }
      );
    }

    const body = await req.json();
    const conversation: ConversationEntry[] = body?.conversation ?? [];
    const questTitle: string | undefined = body?.questTitle;

    if (!Array.isArray(conversation) || conversation.length === 0) {
      return NextResponse.json(
        { error: 'conversation array is required and cannot be empty' },
        { status: 400 }
      );
    }

    const conversationText = conversation
      .map((m) => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.text}`)
      .join('\n');

    const scenario = questTitle ? `Scenario: ${questTitle}.` : '';

    const instruction = `You are a strict evaluator for spoken role-play practice. ${scenario} Read the conversation transcript between the user and the assistant. Score how well the USER handled the situation on a scale from 0 to 500. Consider:
 - clarity and coherence
 - politeness and tone
 - goal completion and appropriateness
 - naturalness and responsiveness

Rules:
 - Return ONLY a single integer from 0 to 500. No words, no labels, no explanations.
 - If unsure, estimate conservatively.
`;

    const prompt = `${instruction}\n\nTranscript:\n${conversationText}\n\nScore (0-500):`;

    const { text } = await generateText({
      model: google('models/gemini-1.5-flash') as any,
      prompt,
      temperature: 0.2,
      maxRetries: 1,
    });

    const match = text.match(/\d{1,3}|[45]\d{2}/);
    let score = match ? parseInt(match[0], 10) : 0;
    if (Number.isNaN(score)) score = 0;
    if (score < 0) score = 0;
    if (score > 500) score = 500;

    return NextResponse.json({ score });
  } catch (error: any) {
    console.error('Score API error:', error);
    return NextResponse.json(
      { error: error?.message ?? 'Failed to score transcript' },
      { status: 500 }
    );
  }
}


