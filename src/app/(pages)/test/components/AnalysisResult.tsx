import type { LoveAnalysisResult } from '../types';

interface AnalysisResultProps {
  result: LoveAnalysisResult;
  onRestart: () => void;
}

export function AnalysisResult({ result, onRestart }: AnalysisResultProps) {
  return (
    <div className="space-y-8">
      <div className="grid gap-5 border-2 border-[var(--ink)] bg-white p-5 shadow-[10px_10px_0_rgba(20,24,30,.14)] md:grid-cols-[180px_1fr] md:p-7">
        <div className="flex aspect-square flex-col items-center justify-center border border-[var(--ink)] bg-[var(--ink)] text-white">
          <span className="text-sm font-black uppercase tracking-[0.18em] text-[var(--aqua)]">Score</span>
          <span className="mt-3 text-6xl font-black text-[var(--coral)]">{result.score}</span>
          <span className="text-sm font-bold text-white/58">/ 100</span>
        </div>
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--coral)]">Analysis profile</p>
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

      <button
        onClick={onRestart}
        className="border-2 border-[var(--ink)] px-6 py-3 font-black transition hover:bg-[var(--ink)] hover:text-white"
      >
        重新测试
      </button>
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
