import { useEffect, useState, useMemo, useRef } from 'react';
import type { FC, MouseEvent } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { PixelButton } from './ui/PixelButton';
import heroMain from '../assets/infographics/hero_main.png';

const FULL_TEXT = "毎日のネタ探し、まだ自分でやってんの？";

export const Hero: FC = () => {
  const [text, setText] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setText(FULL_TEXT.substring(0, index));
      index++;
      if (index > FULL_TEXT.length) {
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Check if device is mobile (touch device)
    const mediaQuery = window.matchMedia('(pointer: coarse)');
    setIsMobile(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Parallax for stars
      gsap.to(starsRef.current, {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      // Parallax for content and scale down
      gsap.to(contentRef.current, {
        y: -200,
        scale: 0.95,
        opacity: 0.8,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    });

    return () => mm.revert();
  }, { scope: sectionRef });

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (isMobile || typeof window === 'undefined') return;

    // Normalize mouse position between -1 and 1
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = (e.clientY / window.innerHeight) * 2 - 1;

    e.currentTarget.style.setProperty('--mouse-x', x.toString());
    e.currentTarget.style.setProperty('--mouse-y', y.toString());
  };

  const scrollToNext = () => {
    if (typeof window === 'undefined') return;
    const nextSection = document.getElementById('pain-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Generate random stars data safely
  const starsData = useMemo(() => {
    if (typeof window === 'undefined') return [];
    return Array.from({ length: 50 }).map(() => ({
      size: Math.random() * 3 + 1,
      top: Math.random() * 100,
      left: Math.random() * 100,
      delay: Math.random() * 3,
      opacity: Math.random() * 0.5 + 0.2
    }));
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-bg-primary bg-noise"
      onMouseMove={handleMouseMove}
    >
      {/* Star Background with Parallax */}
      <div ref={starsRef} className="absolute inset-0 z-0 will-change-transform">
        <div
          className="w-full h-full transition-transform duration-200 ease-out"
          style={!isMobile ? { transform: `translate(calc(var(--mouse-x, 0) * -30px), calc(var(--mouse-y, 0) * -30px))` } : {}}
        >
          {starsData.map((star, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full animate-[twinkle_3s_ease-in-out_infinite]"
              style={{
                width: `${star.size}px`,
                height: `${star.size}px`,
                top: `${star.top}%`,
                left: `${star.left}%`,
                animationDelay: `${star.delay}s`,
                opacity: star.opacity
              }}
            />
          ))}
          {/* Shooting Stars */}
          <div className="absolute top-[10%] left-[80%] w-[100px] h-[2px] bg-gradient-to-r from-white to-transparent opacity-0 animate-[shooting-star_5s_ease-in-out_infinite]" />
          <div className="absolute top-[30%] left-[90%] w-[150px] h-[2px] bg-gradient-to-r from-accent-cyan to-transparent opacity-0 animate-[shooting-star_8s_ease-in-out_infinite_2s]" />
        </div>
      </div>

      <div ref={contentRef} className="relative z-10 w-full flex flex-col items-center will-change-transform">
        <div
          className="w-full text-center px-4 flex flex-col items-center transition-transform duration-200 ease-out"
          style={!isMobile ? { transform: `translate(calc(var(--mouse-x, 0) * 15px), calc(var(--mouse-y, 0) * 15px))` } : {}}
        >
        {/* Delivery Character Animation (CSS Sprite) */}
        <div className="h-32 w-32 mb-8 animate-[run-in_1.5s_ease-out_forwards] flex items-center justify-center">
          <div className="sprite-walk pixelated"></div>
        </div>

        {/* Main Visual Concept */}
        <div className="mb-10 max-w-[300px] md:max-w-[400px] w-full mx-auto animate-float">
          <img
            src={heroMain}
            alt="デイリーデリバリー メインビジュアル"
            className="w-full h-auto rounded-xl border-4 border-accent shadow-[8px_8px_0px_0px_var(--color-accent)] pixelated"
          />
        </div>

        {/* Typing Text */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-retro mb-6 text-white h-20 md:h-24 flex items-center">
          {text}
          <span className="animate-pulse ml-1" aria-hidden="true">_</span>
        </h1>

        <p className="text-lg md:text-xl text-text-muted font-sans mb-10 max-w-2xl mx-auto leading-relaxed">
          スキャンダル速報を毎朝お届け。<br className="md:hidden" />
          ショート動画のネタ、もう困らない。
        </p>

        <PixelButton
          onClick={scrollToNext}
          pulse={true}
          className="text-xl px-8 py-4"
        >
          <span aria-hidden="true">▶</span> はじめる
        </PixelButton>
        </div>
      </div>
    </section>
  );
};
