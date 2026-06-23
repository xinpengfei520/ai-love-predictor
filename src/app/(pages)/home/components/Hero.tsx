import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative isolate min-h-[88vh] overflow-hidden bg-[var(--ink)] text-[var(--paper)]">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_18%_18%,rgba(255,109,92,0.28),transparent_30%),radial-gradient(circle_at_82%_22%,rgba(98,229,210,0.18),transparent_34%),linear-gradient(135deg,#17151c_0%,#0f1720_48%,#11100f_100%)]" />
      <div className="absolute inset-0 -z-10 opacity-[0.18] [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:56px_56px]" />
      <div className="absolute left-1/2 top-12 -z-10 h-[520px] w-[520px] -translate-x-1/2 rounded-full border border-[rgba(255,255,255,.18)] opacity-70 md:top-20">
        <div className="absolute inset-10 rounded-full border border-[rgba(98,229,210,.26)]" />
        <div className="absolute inset-24 rounded-full border border-[rgba(255,109,92,.28)]" />
      </div>

      <div className="mx-auto grid min-h-[88vh] w-full max-w-7xl grid-cols-1 items-center gap-12 px-5 pb-14 pt-20 md:grid-cols-[1.05fr_.95fr] md:px-8 md:pt-24">
        <div className="relative z-10">
          <div className="mb-8 inline-flex items-center gap-3 border border-white/15 bg-white/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--aqua)] shadow-[0_0_40px_rgba(98,229,210,.12)]">
            <span className="h-2 w-2 rounded-full bg-[var(--coral)] shadow-[0_0_18px_var(--coral)]" />
            Emotional Signal Lab
          </div>
          <h1 className="max-w-4xl text-[clamp(3.4rem,10vw,8.5rem)] font-black leading-[0.86] tracking-normal">
            AI 爱情
            <span className="block text-[var(--coral)]">预测</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/72 md:text-2xl md:leading-10">
            用一套轻量测试，把性格倾向、关系价值观和相处模式变成可读的情感信号。
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/test"
              className="group inline-flex min-h-14 items-center justify-center bg-[var(--coral)] px-7 text-base font-black text-[var(--ink)] shadow-[8px_8px_0_rgba(98,229,210,.75)] transition duration-200 hover:-translate-y-1 hover:shadow-[12px_12px_0_rgba(98,229,210,.85)] focus:outline-none focus:ring-4 focus:ring-[rgba(98,229,210,.35)]"
            >
              开始测试
              <span className="ml-3 transition-transform group-hover:translate-x-1">-&gt;</span>
            </Link>
            <div className="text-sm leading-6 text-white/58">
              约 3 分钟完成<br className="hidden sm:block" />
              测试数据仅在本地流程中使用
            </div>
          </div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[520px]">
          <div className="relative border border-white/14 bg-[#151a20]/80 p-4 shadow-[0_30px_90px_rgba(0,0,0,.38)] backdrop-blur">
            <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-white/42">Live reading</p>
                <p className="mt-1 text-xl font-black">契合度雷达</p>
              </div>
              <div className="border border-[var(--aqua)]/40 px-3 py-1 text-sm font-bold text-[var(--aqua)]">
                82.7%
              </div>
            </div>

            <div className="grid gap-3">
              {[
                ['情绪响应', '91%'],
                ['沟通节奏', '76%'],
                ['长期规划', '84%'],
                ['独立空间', '69%'],
              ].map(([label, value]) => (
                <div key={label} className="grid grid-cols-[92px_1fr_48px] items-center gap-3 text-sm">
                  <span className="text-white/62">{label}</span>
                  <span className="h-2 bg-white/10">
                    <span
                      className="block h-full bg-[linear-gradient(90deg,var(--aqua),var(--coral))]"
                      style={{ width: value }}
                    />
                  </span>
                  <span className="text-right font-bold text-white/84">{value}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="bg-white/[0.06] p-4">
                <p className="text-xs text-white/46">推荐相处方式</p>
                <p className="mt-3 text-2xl font-black text-[var(--aqua)]">慢热共振</p>
              </div>
              <div className="bg-white/[0.06] p-4">
                <p className="text-xs text-white/46">风险提示</p>
                <p className="mt-3 text-2xl font-black text-[var(--coral)]">表达延迟</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 
