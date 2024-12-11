'use client';

import { useState } from 'react';
import { BasicInfoForm } from './components/BasicInfoForm';
import { PersonalityTest } from './components/PersonalityTest';
import { ProgressBar } from './components/ProgressBar';
import type { TestState } from './types';

const steps = [
  {
    id: 1,
    title: '基本信息',
    description: '请填写您的基本信息'
  },
  {
    id: 2,
    title: '性格测试',
    description: '了解您的性格特征'
  },
  {
    id: 3,
    title: '感情观念',
    description: '探索您的感情价值观'
  }
];

export default function TestPage() {
  const [state, setState] = useState<TestState>({
    currentStep: 1,
    basicInfo: {
      age: 0,
      gender: 'male'
    },
    personalityTest: {
      answers: {}
    }
  });

  const progress = (state.currentStep / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <ProgressBar progress={progress} />
        
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-4">
            {steps[state.currentStep - 1].title}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            {steps[state.currentStep - 1].description}
          </p>

          {state.currentStep === 1 && (
            <BasicInfoForm 
              value={state.basicInfo}
              onChange={(basicInfo) => setState(prev => ({ ...prev, basicInfo }))}
              onNext={() => setState(prev => ({ ...prev, currentStep: prev.currentStep + 1 }))}
            />
          )}

          {state.currentStep === 2 && (
            <PersonalityTest
              value={state.personalityTest}
              onChange={(personalityTest) => setState(prev => ({ ...prev, personalityTest }))}
              onNext={() => setState(prev => ({ ...prev, currentStep: prev.currentStep + 1 }))}
              onBack={() => setState(prev => ({ ...prev, currentStep: prev.currentStep - 1 }))}
            />
          )}
        </div>
      </div>
    </div>
  );
} 