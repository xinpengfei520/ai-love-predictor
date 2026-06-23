'use client';

import Link from 'next/link';
import { useState } from 'react';
import { AnalysisResult } from './components/AnalysisResult';
import { BasicInfoForm } from './components/BasicInfoForm';
import { PersonalityTest } from './components/PersonalityTest';
import { ProgressBar } from './components/ProgressBar';
import { RelationshipValues } from './components/RelationshipValues';
import type { LoveAnalysisResult, TestState } from './types';

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

const initialState: TestState = {
  currentStep: 1,
  basicInfo: {
    age: 0,
    gender: 'male'
  },
  personalityTest: {
    answers: {}
  },
  relationshipValues: {}
};

export default function TestPage() {
  const [state, setState] = useState<TestState>(initialState);
  const [analysisResult, setAnalysisResult] = useState<LoveAnalysisResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const progress = analysisResult ? 100 : (state.currentStep / steps.length) * 100;
  const currentTitle = analysisResult ? '测试结果' : steps[state.currentStep - 1].title;
  const currentDescription = analysisResult ? 'DeepSeek 已生成你的情感关系偏好报告' : steps[state.currentStep - 1].description;

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          basicInfo: {
            age: state.basicInfo.age,
            gender: state.basicInfo.gender,
          },
          personalityAnswers: state.personalityTest.answers,
          relationshipValues: state.relationshipValues,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '提交测试失败，请稍后重试');
      }

      setAnalysisResult(data.result);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : '提交测试失败，请稍后重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRestart = () => {
    setState(initialState);
    setAnalysisResult(null);
    setSubmitError('');
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[var(--ink)] text-[var(--paper)]">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_12%,rgba(98,229,210,.18),transparent_28%),radial-gradient(circle_at_90%_16%,rgba(255,109,92,.2),transparent_32%)]" />
      <div className="mx-auto grid min-h-screen w-full max-w-7xl gap-8 px-5 py-8 md:grid-cols-[340px_1fr] md:px-8 md:py-10">
        <aside className="border border-white/12 bg-white/[0.04] p-5 backdrop-blur md:sticky md:top-10 md:max-h-[calc(100vh-5rem)] md:overflow-y-auto">
          <Link href="/" className="inline-flex text-sm font-black text-[var(--aqua)] hover:text-white">
            &lt;- 返回首页
          </Link>
          <div className="mt-10">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-white/42">Compatibility test</p>
            <h1 className="mt-3 text-4xl font-black leading-tight">情感信号采样</h1>
            <p className="mt-4 text-sm leading-7 text-white/58">
              完成三段简短输入，生成更清楚的关系偏好画像。
            </p>
          </div>

          <div className="mt-10">
            <ProgressBar progress={progress} />
          </div>

          <ol className="mt-10 space-y-3">
            {steps.map((step) => {
              const isActive = state.currentStep === step.id;
              const isDone = state.currentStep > step.id;

              return (
                <li
                  key={step.id}
                  className={`border p-4 transition ${
                    isActive
                      ? 'border-[var(--coral)] bg-[var(--coral)]/12'
                      : isDone
                        ? 'border-[var(--aqua)]/35 bg-[var(--aqua)]/8'
                        : 'border-white/10 bg-white/[0.03]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-black">0{step.id}</span>
                    <span className={`h-2 w-2 rounded-full ${isDone ? 'bg-[var(--aqua)]' : isActive ? 'bg-[var(--coral)]' : 'bg-white/22'}`} />
                  </div>
                  <p className="mt-4 font-black">{step.title}</p>
                  <p className="mt-1 text-sm text-white/50">{step.description}</p>
                </li>
              );
            })}
          </ol>
        </aside>

        <main className="flex items-center">
          <div className="w-full border border-white/12 bg-[#f8f1e6] p-5 text-[var(--ink)] shadow-[0_30px_100px_rgba(0,0,0,.36)] md:p-8">
            <div className="mb-8 flex flex-col justify-between gap-4 border-b border-[var(--ink)]/12 pb-6 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[var(--coral)]">
                  {analysisResult ? 'Result' : `Step 0${state.currentStep}`}
                </p>
                <h2 className="mt-3 text-3xl font-black md:text-5xl">
                  {currentTitle}
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-7 text-[var(--muted)]">
                {currentDescription}
              </p>
            </div>

          {analysisResult && (
            <AnalysisResult result={analysisResult} onRestart={handleRestart} />
          )}

          {!analysisResult && state.currentStep === 1 && (
            <BasicInfoForm 
              value={state.basicInfo}
              onChange={(basicInfo) => setState(prev => ({ ...prev, basicInfo }))}
              onNext={() => setState(prev => ({ ...prev, currentStep: prev.currentStep + 1 }))}
            />
          )}

          {!analysisResult && state.currentStep === 2 && (
            <PersonalityTest
              value={state.personalityTest}
              onChange={(personalityTest) => setState(prev => ({ ...prev, personalityTest }))}
              onNext={() => setState(prev => ({ ...prev, currentStep: prev.currentStep + 1 }))}
              onBack={() => setState(prev => ({ ...prev, currentStep: prev.currentStep - 1 }))}
            />
          )}

            {!analysisResult && state.currentStep === 3 && (
              <RelationshipValues
                value={state.relationshipValues}
                onChange={(relationshipValues) => setState(prev => ({ ...prev, relationshipValues }))}
                onSubmit={handleSubmit}
                onBack={() => setState(prev => ({ ...prev, currentStep: prev.currentStep - 1 }))}
                isSubmitting={isSubmitting}
                error={submitError}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
} 
