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
}

export function RelationshipValues({ value, onChange, onSubmit, onBack }: RelationshipValuesProps) {
  const handleChange = (questionId: string, score: number) => {
    onChange({ ...value, [questionId]: score });
  };

  const isComplete = Object.keys(value).length === questions.length;

  return (
    <div className="space-y-8">
      {questions.map((question) => (
        <div key={question.id} className="space-y-4">
          <h3 className="text-lg font-medium">{question.text}</h3>
          <div className="flex justify-between items-center gap-4">
            <span className="text-sm text-gray-500">完全不同意</span>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((score) => (
                <button
                  key={score}
                  onClick={() => handleChange(question.id, score)}
                  className={`w-10 h-10 rounded-full ${
                    value[question.id] === score
                      ? 'bg-pink-500 text-white'
                      : 'border hover:bg-pink-50 dark:hover:bg-pink-900'
                  }`}
                >
                  {score}
                </button>
              ))}
            </div>
            <span className="text-sm text-gray-500">完全同意</span>
          </div>
        </div>
      ))}

      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          className="px-6 py-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          上一步
        </button>
        
        {isComplete && (
          <button
            onClick={onSubmit}
            className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:from-pink-600 hover:to-purple-600"
          >
            提交测试
          </button>
        )}
      </div>
    </div>
  );
} 