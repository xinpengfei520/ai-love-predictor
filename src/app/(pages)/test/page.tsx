'use client';

import Link from 'next/link';
import { useState } from 'react';
import { BasicInfoForm } from './components/BasicInfoForm';
import { PersonalityTest } from './components/PersonalityTest';
import { ProgressBar } from './components/ProgressBar';
import { RelationshipValues } from './components/RelationshipValues';
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
    },
    relationshipValues: {}
  });

  const progress = (state.currentStep / steps.length) * 100;

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
                  Step 0{state.currentStep}
                </p>
                <h2 className="mt-3 text-3xl font-black md:text-5xl">
                  {steps[state.currentStep - 1].title}
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-7 text-[var(--muted)]">
                {steps[state.currentStep - 1].description}
              </p>
            </div>

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

            {state.currentStep === 3 && (
              <RelationshipValues
                value={state.relationshipValues}
                onChange={(relationshipValues) => setState(prev => ({ ...prev, relationshipValues }))}
                onSubmit={() => alert('测试已完成，结果页功能开发中')}
                onBack={() => setState(prev => ({ ...prev, currentStep: prev.currentStep - 1 }))}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
} 
