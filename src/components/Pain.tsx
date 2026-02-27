import type { FC } from 'react';
import { RPGWindow } from './ui/RPGWindow';
import { PAIN_POINTS } from '../data/content';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const Pain: FC = () => {
  const { ref, isVisible } = useScrollReveal(0.2);

  return (
    <section id="pain-section" className="py-20 px-4 bg-bg-secondary min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-3xl w-full" ref={ref}>
        <h2 className="text-3xl md:text-4xl text-center mb-12 text-accent-cyan animate-pulse">
          ▼ こんな悩み、ありませんか？
        </h2>
        
        <div className="space-y-6">
          {PAIN_POINTS.map((pain, index) => (
            <div 
              key={pain.id}
              className={`transition-all duration-1000 transform ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 300}ms` }}
            >
              <RPGWindow className="flex items-start gap-4">
                <div className="text-4xl shrink-0">🧑</div>
                <div className="text-lg md:text-xl py-2">
                  「{pain.text}」
                </div>
              </RPGWindow>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
