export function Features() {
  const features = [
    {
      title: '智能匹配',
      description: '基于AI的多维度分析，准确预测情感契合度',
      icon: '🤖'
    },
    {
      title: '专业建议',
      description: '提供个性化的情感建议和关系维护指导',
      icon: '💡'
    },
    {
      title: '趣味测试',
      description: '轻松有趣的测试过程，即刻获得分析结果',
      icon: '✨'
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          为什么选择我们
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="p-6 bg-pink-50 dark:bg-pink-950 rounded-lg hover:shadow-lg transition-shadow duration-200"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 