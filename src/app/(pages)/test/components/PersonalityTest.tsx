'use client';

import { useState } from 'react';
import type { PersonalityTest as PersonalityTestType } from '../types';

interface PersonalityTestProps {
  value: PersonalityTestType;
  onChange: (value: PersonalityTestType) => void;
  onNext: () => void;
  onBack: () => void;
}

const questions = [
  {
    id: 1,
    text: '我倾向于在社交场合主动与他人交谈',
  },
  {
    id: 2,
    text: '我喜欢按计划行事，而不是随性而为',
  },
  {
    id: 3,
    text: '我经常关注他人的情绪变化',
  },
  {
    id: 4,
    text: '我在做决定时更依赖理性分析而非直觉',
  },
  {
    id: 5,
    text: '我愿意为了恋人改变自己的生活方式',
  },
];

export function PersonalityTest({ value, onChange, onNext, onBack }: PersonalityTestProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleAnswer = (score: number) => {
    const newAnswers = {
      ...value.answers,
      [questions[currentQuestion].id]: score,
    };
    
    onChange({ answers: newAnswers });

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const isComplete = Object.keys(value.answers).length === questions.length;

  return (
    <div className="space-y-8">
      <div className="mb-8 flex items-center justify-between border border-[var(--ink)]/12 bg-white p-4">
        <p className="text-sm font-black text-[var(--muted)]">
          问题 {currentQuestion + 1} / {questions.length}
        </p>
        <div className="flex gap-1">
          {questions.map((question, index) => (
            <span
              key={question.id}
              className={`h-2 w-8 ${index <= currentQuestion ? 'bg-[var(--coral)]' : 'bg-[var(--ink)]/12'}`}
            />
          ))}
        </div>
      </div>

      <div className="border-2 border-[var(--ink)] bg-white p-5 shadow-[10px_10px_0_rgba(20,24,30,.14)] md:p-7">
        <h3 className="text-2xl font-black leading-snug">{questions[currentQuestion].text}</h3>
        
        <div className="mt-8 grid grid-cols-5 gap-2 md:gap-3">
          {[1, 2, 3, 4, 5].map((score) => (
            <button
              key={score}
              onClick={() => handleAnswer(score)}
              className={`aspect-square border-2 text-xl font-black transition hover:-translate-y-1 ${
                value.answers[questions[currentQuestion].id] === score
                  ? 'border-[var(--ink)] bg-[var(--ink)] text-white shadow-[5px_5px_0_var(--coral)]'
                  : 'border-[var(--ink)]/18 bg-[#f8f1e6] hover:border-[var(--ink)] hover:bg-[var(--aqua)]/20'
              }`}
            >
              {score}
            </button>
          ))}
        </div>
        <div className="mt-5 flex justify-between text-xs font-bold uppercase tracking-[0.08em] text-[var(--muted)]">
          <p>
            1 = 完全不同意，5 = 完全同意
          </p>
        </div>
      </div>

      <div className="mt-8 flex justify-between gap-4">
        <button
          onClick={onBack}
          className="border-2 border-[var(--ink)] px-6 py-3 font-black transition hover:bg-[var(--ink)] hover:text-white"
        >
          上一步
        </button>
        
        {isComplete && (
          <button
            onClick={onNext}
            className="bg-[var(--coral)] px-6 py-3 font-black text-[var(--ink)] shadow-[6px_6px_0_var(--aqua)] transition hover:-translate-y-1"
          >
            下一步
          </button>
        )}
      </div>
    </div>
  );
} 
