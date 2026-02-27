import { useEffect, useState } from 'react';
import type { FC } from 'react';
import { PixelButton } from './ui/PixelButton';
import heroSprite from '../assets/sprites/hero_sprite.png';
import heroMain from '../assets/infographics/hero_main.png';

export const Hero: FC = () => {
  const [text, setText] = useState('');
  const fullText = "毎日のネタ探し、まだ自分でやってんの？";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setText(fullText.substring(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);

  const scrollToNext = () => {
    const nextSection = document.getElementById('pain-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Generate random stars
  const [stars] = useState(() => {
    return Array.from({ length: 50 }).map((_, i) => {
      const size = Math.random() * 3 + 1;
      return (
        <div
          key={i}
          className="absolute bg-white rounded-full animate-[twinkle_3s_ease-in-out_infinite]"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            opacity: Math.random() * 0.5 + 0.2
          }}
        />
      );
    });
  });

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-bg-primary">
      {/* Star Background */}
      <div className="absolute inset-0 z-0">
        {stars}
      </div>

      <div className="relative z-10 text-center px-4 flex flex-col items-center">
        {/* Delivery Character Animation */}
        <div className="h-32 w-32 mb-8 animate-[run-in_1.5s_ease-out_forwards] flex items-center justify-center">
          <img
            src={heroSprite}
            alt="配達員キャラクター"
            className="w-full h-full object-contain pixelated filter drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
          />
        </div>

        {/* Main Visual Concept */}
        <div className="mb-10 max-w-[300px] md:max-w-[400px] w-full mx-auto animate-float">
          <img
            src={heroMain}
            alt="デイリーデリバリー メインビジュアル"
            className="w-full h-auto rounded-xl border-4 border-accent shadow-[0_0_20px_rgba(233,69,96,0.5)] pixelated"
          />
        </div>

        {/* Typing Text */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-retro mb-6 text-white h-20 md:h-24 flex items-center">
          {text}
          <span className="animate-pulse ml-1">_</span>
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
          ▶ はじめる
        </PixelButton>
      </div>
    </section>
  );
};
