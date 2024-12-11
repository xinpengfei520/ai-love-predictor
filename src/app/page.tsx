import { Hero } from './(pages)/home/components/Hero';
import { Features } from './(pages)/home/components/Features';

export default function Home() {
  return (
    <div className="min-h-screen">
      <main className="w-full">
        <Hero />
        <Features />
      </main>
    </div>
  );
}
