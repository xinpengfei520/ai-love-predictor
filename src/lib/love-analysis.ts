export type Gender = 'male' | 'female';

export interface LoveAnalysisRequest {
  basicInfo: {
    nickname: string;
    age: number;
    gender: Gender;
  };
  personalityAnswers: Record<string, number>;
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

const personalityQuestions: Record<string, string> = {
  '1': '我倾向于在社交场合主动与他人交谈',
  '2': '我喜欢按计划行事，而不是随性而为',
  '3': '我经常关注他人的情绪变化',
  '4': '我在做决定时更依赖理性分析而非直觉',
  '5': '我愿意为了恋人改变自己的生活方式',
};

const relationshipQuestions: Record<string, string> = {
  commitment: '长期稳定的关系对我来说很重要',
  romance: '我重视浪漫和惊喜在感情中的作用',
  independence: '我认为保持个人独立空间很重要',
  communication: '我倾向于直接表达自己的想法和感受',
  future: '共同的未来规划是维系感情的关键',
};

export const LOVE_ANALYSIS_SYSTEM_PROMPT = `
你是「AI Love Predictor」的首席情感关系分析师，也是一名擅长把问卷数据转化为产品化报告的中文内容设计师。

你的任务：基于用户提交的昵称、基础信息、性格倾向题、关系价值观题，生成一份温和、专业、可执行的情感关系偏好报告。

分析原则：
1. 你不是算命师，不做玄学断言，不承诺预测未来，不使用“命中注定”“一定会”等绝对化措辞。
2. 你不是医生或心理咨询师，不做心理疾病诊断，不给医疗建议。
3. 把测试结果解释为“关系偏好与相处线索”，不是给用户贴固定标签。
4. 输出要具体、有温度、有行动感；避免空泛鸡汤。
5. 如果数据不足，也要基于已给答案给出谨慎分析，不编造用户没有提供的信息。
6. 中文表达要自然、克制、专业，适合直接展示在产品 UI 中。

你必须只输出合法 JSON，不要输出 Markdown，不要输出代码块，不要输出 JSON 之外的任何解释。

JSON 结构必须完全符合：
{
  "score": number,
  "profileTitle": string,
  "summary": string,
  "dimensions": [
    { "name": string, "score": number, "insight": string }
  ],
  "strengths": string[],
  "risks": string[],
  "suggestions": string[]
}

字段要求：
- score：0 到 100 的整数，代表当前关系能力/准备度综合指数，不是“找到真爱概率”。
- profileTitle：8 到 14 个中文字符，像一个产品化画像名称，例如“慢热共振型”“清醒经营型”。
- summary：80 到 130 个中文字符，概括用户的情感模式。
- dimensions：必须正好 4 项，name 分别围绕“情绪响应”“沟通节奏”“稳定承诺”“个人空间”，score 为 0 到 100 整数，insight 每项 35 到 70 个中文字符。
- strengths：正好 3 条，每条 18 到 35 个中文字符。
- risks：正好 3 条，每条 18 到 35 个中文字符，语气提醒而非吓人。
- suggestions：正好 4 条，每条 20 到 45 个中文字符，必须是可执行建议。
`.trim();

export function buildLoveAnalysisUserPrompt(payload: LoveAnalysisRequest) {
  return JSON.stringify(
    {
      instruction: '请根据以下测试数据生成情感关系偏好报告。',
      basicInfo: {
        nickname: payload.basicInfo.nickname,
        age: payload.basicInfo.age,
        gender: payload.basicInfo.gender === 'male' ? '男性' : '女性',
      },
      scale: '所有题目均为 1 到 5 分，1 表示完全不同意，5 表示完全同意。',
      personality: Object.entries(payload.personalityAnswers).map(([id, score]) => ({
        question: personalityQuestions[id] ?? `性格题 ${id}`,
        score,
      })),
      relationshipValues: Object.entries(payload.relationshipValues).map(([id, score]) => ({
        question: relationshipQuestions[id] ?? `关系价值观题 ${id}`,
        score,
      })),
    },
    null,
    2,
  );
}

export function validateLoveAnalysisPayload(value: unknown): LoveAnalysisRequest {
  if (!value || typeof value !== 'object') {
    throw new Error('请求数据格式不正确');
  }

  const payload = value as Partial<LoveAnalysisRequest>;
  const nickname = payload.basicInfo?.nickname;
  const age = payload.basicInfo?.age;
  const gender = payload.basicInfo?.gender;

  if (typeof nickname !== 'string' || nickname.trim().length < 1 || nickname.trim().length > 20) {
    throw new Error('昵称需要在 1 到 20 个字符之间');
  }

  if (typeof age !== 'number' || age < 18 || age > 100) {
    throw new Error('年龄需要在 18 到 100 岁之间');
  }

  if (gender !== 'male' && gender !== 'female') {
    throw new Error('性别数据不正确');
  }

  if (!isScoreRecord(payload.personalityAnswers, 5)) {
    throw new Error('性格测试数据不完整');
  }

  if (!isScoreRecord(payload.relationshipValues, 5)) {
    throw new Error('感情观念数据不完整');
  }

  return {
    basicInfo: { nickname: nickname.trim(), age, gender },
    personalityAnswers: payload.personalityAnswers,
    relationshipValues: payload.relationshipValues,
  };
}

export function normalizeLoveAnalysisResult(value: unknown): LoveAnalysisResult {
  if (!value || typeof value !== 'object') {
    throw new Error('模型返回格式不正确');
  }

  const result = value as Partial<LoveAnalysisResult>;

  return {
    score: clampInteger(result.score, 0, 100, 72),
    profileTitle: normalizeText(result.profileTitle, '关系探索型'),
    summary: normalizeText(result.summary, '你对亲密关系有清晰的期待，也在寻找稳定、真实且能彼此理解的相处方式。'),
    dimensions: normalizeDimensions(result.dimensions),
    strengths: normalizeList(result.strengths, ['愿意认真理解关系中的真实需求', '能在相处中保持一定自我觉察', '对长期关系具备基础经营意识'], 3),
    risks: normalizeList(result.risks, ['遇到分歧时可能先压抑再表达', '对关系节奏的期待需要提前沟通', '容易把部分压力独自消化太久'], 3),
    suggestions: normalizeList(result.suggestions, ['在关系早期主动说明自己的沟通偏好', '把期待拆成具体行为，而不是等待对方猜测', '保留稳定的个人空间，让亲密关系更可持续', '遇到冲突时先描述事实，再表达感受和请求'], 4),
  };
}

function isScoreRecord(value: unknown, minLength: number): value is Record<string, number> {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const entries = Object.entries(value);
  return entries.length >= minLength && entries.every(([, score]) => typeof score === 'number' && score >= 1 && score <= 5);
}

function normalizeDimensions(value: unknown): LoveAnalysisResult['dimensions'] {
  const fallback = [
    { name: '情绪响应', score: 76, insight: '你能注意到关系中的情绪变化，但仍需要把感受更及时地说出口。' },
    { name: '沟通节奏', score: 72, insight: '你偏向先整理想法再表达，适合建立固定的沟通窗口。' },
    { name: '稳定承诺', score: 80, insight: '你重视长期关系的确定感，也愿意为共同目标投入精力。' },
    { name: '个人空间', score: 68, insight: '你需要在亲密与独立之间保持平衡，避免因靠太近而消耗。' },
  ];

  if (!Array.isArray(value)) {
    return fallback;
  }

  return fallback.map((item, index) => {
    const source = value[index] as Partial<LoveAnalysisResult['dimensions'][number]> | undefined;
    return {
      name: normalizeText(source?.name, item.name),
      score: clampInteger(source?.score, 0, 100, item.score),
      insight: normalizeText(source?.insight, item.insight),
    };
  });
}

function normalizeList(value: unknown, fallback: string[], length: number) {
  const list = Array.isArray(value)
    ? value.filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
    : [];

  return [...list, ...fallback].slice(0, length);
}

function normalizeText(value: unknown, fallback: string) {
  return typeof value === 'string' && value.trim().length > 0 ? value.trim() : fallback;
}

function clampInteger(value: unknown, min: number, max: number, fallback: number) {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    return fallback;
  }

  return Math.min(max, Math.max(min, Math.round(value)));
}
