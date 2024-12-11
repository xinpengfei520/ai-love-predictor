import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-pink-50 to-white dark:from-pink-950 dark:to-gray-900">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
          AI 爱情预测
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-600 dark:text-gray-300">
          探索你的情感密码，预见爱情可能
        </p>
        <Link 
          href="/test"
          className="inline-block px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-500 rounded-full hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-xl"
        >
          开始测试
        </Link>
      </div>
    </section>
  );
} 