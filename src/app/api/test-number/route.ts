import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

interface UpstashIncrResponse {
  result?: number;
  error?: string;
}

export async function POST() {
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!redisUrl || !redisToken) {
    return NextResponse.json(
      { error: '测试编号存储未配置' },
      { status: 501 },
    );
  }

  try {
    const year = getShanghaiYear();
    const key = `ai-love-predictor:test-count:${year}`;
    const response = await fetch(`${redisUrl.replace(/\/$/, '')}/incr/${encodeURIComponent(key)}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${redisToken}`,
      },
      cache: 'no-store',
    });

    const data = (await response.json()) as UpstashIncrResponse;

    if (!response.ok || typeof data.result !== 'number') {
      throw new Error(data.error || '测试编号生成失败');
    }

    return NextResponse.json({
      testNumber: formatTestNumber(year, data.result),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : '测试编号生成失败';

    return NextResponse.json({ error: message }, { status: 502 });
  }
}

function getShanghaiYear() {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
  }).format(new Date());
}

function formatTestNumber(year: string, count: number) {
  return `No.${year}${String(count).padStart(4, '0')}`;
}
