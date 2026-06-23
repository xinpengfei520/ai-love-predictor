'use client';

import { toPng } from 'html-to-image';
import QRCode from 'qrcode';
import { useEffect, useRef, useState } from 'react';
import type { LoveAnalysisResult } from '../types';

interface AnalysisResultProps {
  result: LoveAnalysisResult;
  nickname: string;
  onRestart: () => void;
}

export function AnalysisResult({ result, nickname, onRestart }: AnalysisResultProps) {
  const reportRef = useRef<HTMLDivElement>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  const displayName = nickname || '你';

  useEffect(() => {
    const url = `${window.location.origin}/test`;

    QRCode.toDataURL(url, {
      width: 220,
      margin: 1,
      color: {
        dark: '#14181e',
        light: '#f8f1e6',
      },
    }).then(setQrCodeUrl);
  }, []);

  const handleDownload = async () => {
    if (!reportRef.current) {
      return;
    }

    setIsDownloading(true);

    try {
      const dataUrl = await toPng(reportRef.current, {
        cacheBust: true,
        pixelRatio: 3,
        backgroundColor: '#f8f1e6',
      });
      const link = document.createElement('a');
      link.download = `${sanitizeFileName(displayName)}-AI情感分析报告.png`;
      link.href = dataUrl;
      link.click();
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div ref={reportRef} className="space-y-8 bg-[#f8f1e6] p-1">
        <div className="grid gap-5 border-2 border-[var(--ink)] bg-white p-5 shadow-[10px_10px_0_rgba(20,24,30,.14)] md:grid-cols-[180px_1fr] md:p-7">
          <div className="flex aspect-square flex-col items-center justify-center border border-[var(--ink)] bg-[var(--ink)] text-white">
            <span className="text-sm font-black uppercase tracking-[0.18em] text-[var(--aqua)]">Score</span>
            <span className="mt-3 text-6xl font-black text-[var(--coral)]">{result.score}</span>
            <span className="text-sm font-bold text-white/58">/ 100</span>
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--coral)]">
              {`${displayName} 的情感画像`}
            </p>
            <h3 className="mt-3 text-4xl font-black">{result.profileTitle}</h3>
            <p className="mt-5 text-base leading-8 text-[var(--muted)]">{result.summary}</p>
          </div>
        </div>

        <section>
          <h3 className="text-2xl font-black">维度雷达</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {result.dimensions.map((dimension) => (
              <article key={dimension.name} className="border border-[var(--ink)]/12 bg-white p-4">
                <div className="flex items-center justify-between gap-4">
                  <h4 className="font-black">{dimension.name}</h4>
                  <span className="text-xl font-black text-[var(--coral)]">{dimension.score}</span>
                </div>
                <div className="mt-3 h-2 bg-[var(--ink)]/10">
                  <div
                    className="h-full bg-[linear-gradient(90deg,var(--aqua),var(--coral))]"
                    style={{ width: `${dimension.score}%` }}
                  />
                </div>
                <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{dimension.insight}</p>
              </article>
            ))}
          </div>
        </section>

        <div className="grid gap-4 md:grid-cols-3">
          <ResultList title="关系优势" items={result.strengths} />
          <ResultList title="需要留意" items={result.risks} />
          <ResultList title="行动建议" items={result.suggestions} />
        </div>

        <div className="flex flex-col items-center justify-center gap-3 border border-[var(--ink)]/18 bg-white px-5 py-6 text-center">
          <div>
            <h3 className="text-lg font-black">扫码生成你的情感画像</h3>
          </div>
          {qrCodeUrl && (
            <div className="border border-[var(--ink)] bg-[#f8f1e6] p-2">
              {/* QRCode returns a client-generated data URL, so next/image is not useful here. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={qrCodeUrl} alt="测试页面二维码" className="h-24 w-24" />
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="bg-[var(--coral)] px-6 py-3 font-black text-[var(--ink)] shadow-[6px_6px_0_var(--aqua)] transition hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {isDownloading ? '正在生成图片...' : '下载高清报告'}
        </button>
        <button
          onClick={onRestart}
          className="border-2 border-[var(--ink)] px-6 py-3 font-black transition hover:bg-[var(--ink)] hover:text-white"
        >
          重新测试
        </button>
      </div>
    </div>
  );
}

function ResultList({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="border border-[var(--ink)]/12 bg-white p-4">
      <h3 className="font-black text-[var(--ink)]">{title}</h3>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="border-l-4 border-[var(--coral)] pl-3 text-sm leading-7 text-[var(--muted)]">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

function sanitizeFileName(value: string) {
  return value.replace(/[\\/:*?"<>|]/g, '').trim() || 'AI情感分析报告';
}
