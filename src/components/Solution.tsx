import { useRef } from 'react';
import type { FC } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { FEATURES } from '../data/content';

import { PrepPointBox } from './ui/PrepPointBox';
import { CheckList } from './ui/CheckList';
import { AnimatedGridPattern } from './ui/AnimatedGridPattern';
import { cn } from '../lib/utils';
import castleBg from '../assets/infographics/castle.png';

export const Solution: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Background Parallax
      gsap.to('.castle-bg', {
        y: 100,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

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
    <section id="solution-section" className="py-20 px-4 bg-bg-primary min-h-screen flex flex-col items-center justify-center relative overflow-hidden" ref={containerRef}>   
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <img
          src={castleBg}
          alt=""
          className="castle-bg w-full h-full object-cover opacity-20"
          onError={(e) => e.currentTarget.style.display = 'none'}
        />
      </div>

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
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-accent-gold mb-4 drop-shadow-[4px_4px_0px_#F8B800] break-keep">
            <span aria-hidden="true">[!]</span> デイリーデリバリー が現れた！
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-text-muted mb-10 break-keep">
            あなたの代わりに、AIと専属スタッフが毎日ネタを厳選します。
          </p>
        </div>

        <div className="flex justify-center mb-8" ref={gridRef}>
          <div className="w-full">
            {FEATURES.map((feature, index) => (
              <div
                key={feature.id}
                className="feature-card mb-6"
              >
                <PrepPointBox
                  title={`特徴 ${index + 1}`}
                  icon={feature.icon}
                  variant={index === 1 ? 'accent' : 'primary'}
                  className="hover:-translate-y-1 transition-transform duration-200"
                >
                  <h3 className="text-xl sm:text-2xl md:text-3xl text-accent-cyan mb-4 font-bold border-b-2 border-dashed border-gray-600 pb-2 inline-block break-keep">
                    {feature.title}
                  </h3>
                  <div className="mt-2">
                    <CheckList
                      items={[feature.description]}
                      icon="▶"
                      iconColor={index === 1 ? "text-accent-gold" : "text-accent"}
                    />
                  </div>
                </PrepPointBox>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
