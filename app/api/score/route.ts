import { NextResponse } from 'next/server';
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { quests } from '../../../lib/questdata';

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

    // Find the quest and use its scoring algorithm
    const quest = questTitle ? quests.find(q => q.title === questTitle) : null;
    const scoringPrompt = quest?.scoringAlgorithmPrompt || '';
    
    const scenario = questTitle ? `Scenario: ${questTitle}.` : '';

    const instruction = `You are a strict evaluator for spoken role-play practice. ${scenario} Read the conversation transcript between the user and the assistant. Evaluate how well the USER handled the situation.

${scoringPrompt ? `Use this detailed scoring rubric:\n${scoringPrompt}\n\n` : ''}

Return STRICT JSON with the following shape and nothing else:
{
  "score": number,            // integer 0..100 (based on the rubric above)
  "stars": number,            // integer 1..5 (derived from score)
  "summary": string,          // 1-2 sentences summary of performance
  "strengths": string[],      // 3 short bullet points
  "improvements": string[]    // 3 concise suggestions
}

${!scoringPrompt ? `Scoring guidance (0..100):
- clarity/coherence, politeness/tone, goal completion/appropriateness, naturalness/responsiveness.
- If unsure, estimate conservatively.` : ''}
`;

    const prompt = `${instruction}\n\nTranscript:\n${conversationText}\n\nJSON:`;

    const { text } = await generateText({
      model: google('models/gemini-1.5-flash') as any,
      prompt,
      temperature: 0.2,
      maxRetries: 1,
    });

    let data: any = null;
    // Try direct JSON parse
    try {
      data = JSON.parse(text);
    } catch {
      // Try to extract JSON block
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try { data = JSON.parse(jsonMatch[0]); } catch {}
      }
    }

    if (!data || typeof data !== 'object') {
      throw new Error('Model did not return valid JSON');
    }

    let score = Number.isFinite(data.score) ? Math.round(Number(data.score)) : 0;
    if (score < 0) score = 0;
    if (score > 100) score = 100;
    let stars = Number.isFinite(data.stars) ? Math.round(Number(data.stars)) : Math.max(1, Math.min(5, Math.round(score / 20)));
    if (stars < 1) stars = 1;
    if (stars > 5) stars = 5;

    const summary = typeof data.summary === 'string' ? data.summary : '';
    const strengths = Array.isArray(data.strengths) ? (data.strengths as unknown[]).filter((s: unknown) => typeof s === 'string').slice(0, 5) as string[] : [];
    const improvements = Array.isArray(data.improvements) ? (data.improvements as unknown[]).filter((s: unknown) => typeof s === 'string').slice(0, 5) as string[] : [];

    return NextResponse.json({ score, stars, summary, strengths, improvements });
  } catch (error: any) {
    console.error('Score API error:', error);
    return NextResponse.json(
      { error: error?.message ?? 'Failed to score transcript' },
      { status: 500 }
    );
  }
}


