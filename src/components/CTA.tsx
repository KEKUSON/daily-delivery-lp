import { useMemo, useRef } from 'react';
import type { FC } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { PixelButton } from './ui/PixelButton';
import { LINKS } from '../data/content';

export const CTA: FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Title scrub animation
      gsap.from(titleRef.current, {
        scale: 0.3,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "top 30%",
          scrub: 1.5
        }
      });

      // Buttons entry animation
      gsap.from(buttonsRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "steps(4)",
        scrollTrigger: {
          trigger: buttonsRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });
    });

    mm.add("(max-width: 767px)", () => {
      // Simplified title animation for mobile
      gsap.from(titleRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        ease: "steps(4)",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });

      gsap.from(buttonsRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: "steps(4)",
        scrollTrigger: {
          trigger: buttonsRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });
    });

    return () => mm.revert();
  }, { scope: sectionRef });

  // Generate light particles data moving up
  const particlesData = useMemo(() => {
    if (typeof window === 'undefined') return [];
    return Array.from({ length: 30 }).map(() => ({
      size: Math.random() * 4 + 2,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
      left: Math.random() * 100,
    }));
  }, []);

  return (
    <section className="relative py-32 px-4 bg-bg-primary overflow-hidden flex flex-col items-center justify-center min-h-[70vh]" ref={sectionRef}>
      {/* Gradient Transition from Pricing */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-bg-secondary to-transparent z-20 pointer-events-none" />

      {/* Background Particles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {particlesData.map((p, i) => (
          <div 
            key={i}
            className="absolute bg-accent-gold/40 rounded-full"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              bottom: '-10%',
              left: `${p.left}%`,
              animation: `rise ${p.duration}s linear ${p.delay}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="max-w-3xl w-full text-center relative z-10">
        <div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl text-white mb-12 drop-shadow-[4px_4px_0px_#E40058] will-change-[transform,opacity]" ref={titleRef}>
            冒険に出よう！
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6" ref={buttonsRef}>
            <PixelButton 
              as="a" 
              href={LINKS.form} 
              target="_blank" 
              rel="noopener noreferrer" 
              pulse={true} 
              className="w-full sm:w-auto text-xl py-4 px-8"
            >
              <span aria-hidden="true">▶</span> 無料お試しに申し込む
            </PixelButton>
            
            <PixelButton 
              as="a" 
              href={LINKS.xDm} 
              target="_blank" 
              rel="noopener noreferrer" 
              variant="secondary" 
              className="w-full sm:w-auto text-xl py-4 px-8"
            >
              <span aria-hidden="true">✉</span> まずは気軽に聞く
            </PixelButton>
          </div>
        </div>
      </div>
    </section>
  );
};
