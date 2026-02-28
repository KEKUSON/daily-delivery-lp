import { useRef } from 'react';
import type { FC } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { FEATURES } from '../data/content';
import { PixelContainer } from './ui/PixelContainer';
import { AnimatedGridPattern } from './ui/AnimatedGridPattern';
import { cn } from '../lib/utils';

export const Solution: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Title scrub animation
      gsap.from(titleRef.current, {
        scale: 0.5,
        opacity: 0,
        duration: 1,
        ease: "steps(6)",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
          end: "top 50%",
          scrub: 1
        }
      });

      // Cards stagger animation
      gsap.from(".feature-card", {
        y: 60,
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        stagger: {
          each: 0.2,
          from: "center"
        },
        ease: "steps(5)",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });
    });

    mm.add("(max-width: 767px)", () => {
      // Simplified title animation for mobile
      gsap.from(titleRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 0.5,
        ease: "steps(4)",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });

      // Simplified cards stagger animation for mobile
      gsap.from(".feature-card", {
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.15,
        ease: "steps(4)",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section className="py-20 px-4 bg-bg-primary min-h-screen flex flex-col items-center justify-center relative overflow-hidden" ref={containerRef}>
      {/* Gradient Transition from Pain */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-bg-secondary to-transparent z-20 pointer-events-none" />

      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.15}
        duration={4}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
          "absolute inset-0 z-0 fill-accent-gold/20 stroke-accent-gold/10"
        )}
      />

      <div className="max-w-5xl w-full z-10">
        <div className="text-center mb-16" ref={titleRef}>
          <h2 className="text-4xl md:text-5xl text-accent-gold mb-4 drop-shadow-[4px_4px_0px_#F8B800]">
            <span aria-hidden="true">[!]</span> デイリーデリバリー が現れた！
          </h2>
          <p className="text-xl text-text-muted mb-10">
            あなたの代わりに、AIと専属スタッフが毎日ネタを厳選します。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" ref={gridRef}>
          {FEATURES.map((feature) => (
            <div
              key={feature.id}
              className="feature-card"
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
