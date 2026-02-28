import type { FC } from 'react';
import { FEATURES } from '../data/content';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { PixelContainer } from './ui/PixelContainer';

export const Solution: FC = () => {
  const { ref, isVisible } = useScrollReveal(0.2);

  return (
    <section className="py-20 px-4 bg-bg-primary min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Gradient Transition from Pain */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-bg-secondary to-transparent z-20 pointer-events-none" />

      <div className="max-w-5xl w-full z-10" ref={ref}>
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          <h2 className="text-4xl md:text-5xl text-accent-gold mb-4 drop-shadow-[4px_4px_0px_#F8B800]">
            <span aria-hidden="true">[!]</span> デイリーデリバリー が現れた！
          </h2>
          <p className="text-xl text-text-muted mb-10">
            あなたの代わりに、AIと専属スタッフが毎日ネタを厳選します。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => (
            <div
              key={feature.id}
              className={`transition-transform duration-300 ${isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-20'
                }`}
              style={{ transitionDelay: `${400 + index * 200}ms` }}
            >
              <PixelContainer className="bg-bg-card border-2 border-white p-6 group hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_#00E8D8] transition-transform duration-200 [transition-timing-function:steps(3,end)] h-full">
                <div className="text-5xl mb-4 group-hover:scale-110 group-hover:drop-shadow-[4px_4px_0px_#FFFFFF] transition-all" aria-hidden="true">
                  {feature.icon}
                </div>
                <h3 className="text-xl text-accent-cyan mb-3 font-bold">
                  {feature.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {feature.description}
                </p>
              </PixelContainer>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
