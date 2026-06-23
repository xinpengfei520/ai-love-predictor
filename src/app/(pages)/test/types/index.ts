export interface TestStep {
  id: number;
  title: string;
  description: string;
}

export interface BasicInfo {
  nickname: string;
  age: number;
  gender: 'male' | 'female';
  photo?: File;
}

export interface PersonalityTest {
  answers: Record<string, number>;
}

export interface TestState {
  currentStep: number;
  basicInfo: BasicInfo;
  personalityTest: PersonalityTest;
  relationshipValues: Record<string, number>;
}

export interface LoveAnalysisResult {
  score: number;
  profileTitle: string;
  summary: string;
  dimensions: Array<{
    name: string;
    score: number;
    insight: string;
  }>;
  strengths: string[];
  risks: string[];
  suggestions: string[];
}
