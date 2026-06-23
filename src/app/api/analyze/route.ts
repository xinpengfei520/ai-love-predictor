import { NextResponse } from 'next/server';
import {
  LOVE_ANALYSIS_SYSTEM_PROMPT,
  buildLoveAnalysisUserPrompt,
  normalizeLoveAnalysisResult,
  validateLoveAnalysisPayload,
} from '@/lib/love-analysis';

export const runtime = 'nodejs';

interface DeepSeekChatResponse {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.DEEPSEEK_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'DeepSeek API Key 未配置，请检查 .env.local' },
        { status: 500 },
      );
    }

    const payload = validateLoveAnalysisPayload(await request.json());
    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-v4-flash',
        messages: [
          {
            role: 'system',
            content: LOVE_ANALYSIS_SYSTEM_PROMPT,
          },
          {
            role: 'user',
            content: buildLoveAnalysisUserPrompt(payload),
          },
        ],
        response_format: { type: 'json_object' },
        thinking: { type: 'disabled' },
        temperature: 0.7,
        max_tokens: 2200,
      }),
    });

    if (!response.ok) {
      const message = await response.text();
      return NextResponse.json(
        { error: `DeepSeek 分析失败：${message || response.statusText}` },
        { status: 502 },
      );
    }

    const data = (await response.json()) as DeepSeekChatResponse;
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return NextResponse.json(
        { error: 'DeepSeek 未返回可解析的分析内容' },
        { status: 502 },
      );
    }

    const result = normalizeLoveAnalysisResult(JSON.parse(content));

    return NextResponse.json({ result });
  } catch (error) {
    const message = error instanceof Error ? error.message : '提交测试失败，请稍后重试';

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
