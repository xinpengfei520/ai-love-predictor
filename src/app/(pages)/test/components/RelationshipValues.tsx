'use client';

const questions = [
  {
    id: 'commitment',
    text: '长期稳定的关系对我来说很重要',
  },
  {
    id: 'romance',
    text: '我重视浪漫和惊喜在感情中的作用',
  },
  {
    id: 'independence',
    text: '我认为保持个人独立空间很重要',
  },
  {
    id: 'communication',
    text: '我倾向于直接表达自己的想法和感受',
  },
  {
    id: 'future',
    text: '共同的未来规划是维系感情的关键',
  },
];

interface RelationshipValuesProps {
  value: Record<string, number>;
  onChange: (value: Record<string, number>) => void;
  onSubmit: () => void;
  onBack: () => void;
  isSubmitting: boolean;
  error: string;
}

export function RelationshipValues({ value, onChange, onSubmit, onBack, isSubmitting, error }: RelationshipValuesProps) {
  const handleChange = (questionId: string, score: number) => {
    onChange({ ...value, [questionId]: score });
  };

  const isComplete = Object.keys(value).length === questions.length;

  return (
    <div className="space-y-8">
      {questions.map((question) => (
        <div key={question.id} className="border border-[var(--ink)]/12 bg-white p-4">
          <h3 className="text-lg font-black">{question.text}</h3>
          <div className="mt-5 grid gap-3 md:grid-cols-[88px_1fr_72px] md:items-center">
            <span className="text-xs font-bold text-[var(--muted)]">完全不同意</span>
            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5].map((score) => (
                <button
                  key={score}
                  onClick={() => handleChange(question.id, score)}
                  className={`h-11 border-2 font-black transition hover:-translate-y-0.5 ${
                    value[question.id] === score
                      ? 'border-[var(--ink)] bg-[var(--ink)] text-white shadow-[4px_4px_0_var(--coral)]'
                      : 'border-[var(--ink)]/16 bg-[#f8f1e6] hover:border-[var(--ink)]'
                  }`}
                >
                  {score}
                </button>
              ))}
            </div>
            <span className="text-xs font-bold text-[var(--muted)] md:text-right">完全同意</span>
          </div>
        </div>
      ))}

      <div className="mt-8 flex justify-between gap-4">
        <button
          onClick={onBack}
          disabled={isSubmitting}
          className="border-2 border-[var(--ink)] px-6 py-3 font-black transition hover:bg-[var(--ink)] hover:text-white"
        >
          上一步
        </button>
        
        {isComplete && (
          <button
            onClick={onSubmit}
            disabled={isSubmitting}
            className="bg-[var(--coral)] px-6 py-3 font-black text-[var(--ink)] shadow-[6px_6px_0_var(--aqua)] transition hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
          >
            {isSubmitting ? 'DeepSeek 分析中...' : '提交测试'}
          </button>
        )}
      </div>

      {error && (
        <div className="border-2 border-[var(--coral)] bg-white p-4 text-sm font-bold leading-7 text-[var(--coral)]">
          {error}
        </div>
      )}
    </div>
  );
} 
