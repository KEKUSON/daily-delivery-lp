import type { FC } from 'react';
import { FEATURES } from '../data/content';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { PixelContainer } from './ui/PixelContainer';
import solutionInfo from '../assets/infographics/solution_info.png';

export const Solution: FC = () => {
  const { ref, isVisible } = useScrollReveal(0.2);

  return (
    <section className="py-20 px-4 bg-bg-primary min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Light burst effect behind the title */}
      <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/20 rounded-full blur-[100px] transition-opacity duration-1000 -z-10 ${isVisible ? 'opacity-100' : 'opacity-0'}`}></div>

      <div className="max-w-5xl w-full z-10" ref={ref}>
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          <h2 className="text-4xl md:text-5xl text-accent-gold mb-4 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]">
            📰 デイリーデリバリー が現れた！
          </h2>
          <p className="text-xl text-text-muted mb-10">
            あなたの代わりに、AIと専属スタッフが毎日ネタを厳選します。
          </p>

          <div className="max-w-3xl mx-auto mb-16">
            <img
              src={solutionInfo}
              alt="サービス解決の流れ"
              className="w-full h-auto rounded-xl border-2 border-accent-cyan shadow-[0_0_15px_rgba(96,165,250,0.5)] pixelated"
            />
          </div>
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
              <PixelContainer className="bg-bg-card border-2 border-white p-6 group hover:-translate-y-2 transition-transform h-full">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
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
