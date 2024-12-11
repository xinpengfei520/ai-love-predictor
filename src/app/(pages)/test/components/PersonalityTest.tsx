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
      <div className="text-center mb-8">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          问题 {currentQuestion + 1} / {questions.length}
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-xl mb-6">{questions[currentQuestion].text}</h3>
        
        <div className="grid grid-cols-5 gap-2">
          {[1, 2, 3, 4, 5].map((score) => (
            <button
              key={score}
              onClick={() => handleAnswer(score)}
              className={`p-4 rounded-lg border ${
                value.answers[questions[currentQuestion].id] === score
                  ? 'bg-pink-500 text-white'
                  : 'hover:bg-pink-50 dark:hover:bg-pink-900'
              }`}
            >
              {score}
            </button>
          ))}
        </div>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">
            1 = 完全不同意，5 = 完全同意
          </p>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          className="px-6 py-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          上一步
        </button>
        
        {isComplete && (
          <button
            onClick={onNext}
            className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:from-pink-600 hover:to-purple-600"
          >
            下一步
          </button>
        )}
      </div>
    </div>
  );
} 