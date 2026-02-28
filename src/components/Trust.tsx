import { useRef } from 'react';
import type { FC } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { StatusBar } from './ui/StatusBar';
import { PixelContainer } from './ui/PixelContainer';

export const Trust: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      gsap.from(titleRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: "steps(3)",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });

      gsap.from(".trust-card", {
        scale: 0.95,
        opacity: 0,
        duration: 0.8,
        ease: "steps(4)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });
    });

    mm.add("(max-width: 767px)", () => {
      gsap.from(titleRef.current, {
        y: 10,
        opacity: 0,
        duration: 0.4,
        ease: "steps(3)",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });

      gsap.from(".trust-card", {
        scale: 0.95,
        opacity: 0,
        duration: 0.5,
        ease: "steps(4)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section className="relative py-20 px-4 bg-bg-primary min-h-screen flex flex-col items-center justify-center overflow-hidden" ref={containerRef}>
      {/* Gradient Transition from Sample */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-bg-secondary to-transparent z-20 pointer-events-none" />

      <div className="max-w-3xl w-full z-10">
        <h2 ref={titleRef} className="text-3xl md:text-4xl text-center mb-12 text-white">
          <span aria-hidden="true">┌─ </span>パーティのステータス<span aria-hidden="true"> ─┐</span>
        </h2>

        <div className="trust-card">
          <PixelContainer className="bg-bg-card border-4 border-white p-8">
            <div className="text-center mb-8">
              <div className="text-xl text-accent-gold mb-2">実績解除済</div>
              <div className="text-2xl font-bold text-white">
                「登録者10万人チャンネルに提供中」
              </div>
            </div>

            <div className="border-t-2 border-dashed border-gray-600 my-6"></div>

            <div className="space-y-6 max-w-md mx-auto">
              <StatusBar 
                label="収集力" 
                level={12} 
                value={8} 
                maxValue={10} 
                variant="blue" 
              />
              <StatusBar 
                label="速度" 
                level={15} 
                value={9} 
                maxValue={10} 
                variant="green" 
              />
              <StatusBar 
                label="精度" 
                level={13} 
                value={8} 
                maxValue={10} 
                variant="purple" 
              />
            </div>
            
            <div className="text-center mt-8 text-xs text-text-muted">
              ※ 実績データに基づく能力値です
            </div>
          </PixelContainer>
        </div>
      </div>
    </section>
  );
};
