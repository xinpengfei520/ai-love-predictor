export function Features() {
  const features = [
    {
      title: '多维信号采样',
      description: '从基本信息、性格倾向和关系价值观中提取稳定特征，避免只看单一标签。',
      metric: '03'
    },
    {
      title: '情感模式归因',
      description: '把测试答案转译成沟通节奏、亲密需求、独立空间等更容易行动的指标。',
      metric: '12'
    },
    {
      title: '轻量即时反馈',
      description: '流程保持短、清楚、有节奏，让用户愿意完成测试，而不是被问卷消耗。',
      metric: '3m'
    }
  ];

  return (
    <section className="bg-[var(--paper)] px-5 py-20 text-[var(--ink)] md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 border-y border-[var(--ink)]/15 py-10 md:grid-cols-[0.75fr_1.25fr] md:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[var(--coral)]">Why it works</p>
            <h2 className="mt-4 text-4xl font-black leading-tight md:text-6xl">
              不是玄学包装，
              <span className="block">是可读的关系线索。</span>
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-[var(--muted)]">
            这个产品的重点不是给爱情下绝对结论，而是帮助用户看见自己的相处偏好。界面也应该像一个可靠的分析工具：有温度，但不轻浮。
          </p>
        </div>

        <div className="grid grid-cols-1 gap-px bg-[var(--ink)]/12 md:grid-cols-3">
          {features.map((feature, index) => (
            <article
              key={feature.title}
              className="group min-h-[300px] bg-[var(--paper)] p-6 transition duration-300 hover:bg-[#f5efe4] md:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="text-sm font-black text-[var(--muted)]">0{index + 1}</span>
                <span className="border border-[var(--ink)] px-3 py-2 text-2xl font-black leading-none text-[var(--coral)] transition group-hover:-translate-y-1 group-hover:bg-[var(--ink)] group-hover:text-[var(--aqua)]">
                  {feature.metric}
                </span>
              </div>
              <h3 className="mt-20 text-2xl font-black">{feature.title}</h3>
              <p className="mt-4 text-base leading-7 text-[var(--muted)]">{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
} 
