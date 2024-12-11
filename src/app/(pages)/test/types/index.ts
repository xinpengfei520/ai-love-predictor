export interface TestStep {
  id: number;
  title: string;
  description: string;
}

export interface BasicInfo {
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
} 