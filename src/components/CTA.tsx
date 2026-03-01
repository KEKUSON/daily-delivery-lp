import { useRef, useCallback } from 'react';
import type { FC } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import * as PIXI from 'pixi.js';
import { PixelButton } from './ui/PixelButton';
import { PixiCanvas } from './ui/PixiCanvas';
import { PrepPointBox } from './ui/PrepPointBox';
import { CheckList } from './ui/CheckList';
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

  const initPixi = useCallback((app: PIXI.Application) => {
    const isMob = window.matchMedia('(max-width: 767px)').matches;
    const numParticles = isMob ? 30 : 80;

    const particlesContainer = new PIXI.Container();
    app.stage.addChild(particlesContainer);

    // Use built-in white texture for optimization
    const particleTexture = PIXI.Texture.WHITE;

    const particles: { sprite: PIXI.Sprite, speed: number, phase: number, targetAlpha: number }[] = [];

    for (let i = 0; i < numParticles; i++) {
      const sprite = new PIXI.Sprite(particleTexture);

      sprite.x = Math.random() * app.screen.width;
      sprite.y = Math.random() * app.screen.height;

      const size = Math.floor(Math.random() * 3) + 2; // 2 to 4 pixels
      sprite.width = size;
      sprite.height = size;

      sprite.tint = 0xF8B800; // accent-gold

      const targetAlpha = 0.3 + Math.random() * 0.3;
      sprite.alpha = targetAlpha;

      particlesContainer.addChild(sprite);

      particles.push({
        sprite,
        speed: 0.5 + Math.random() * 1.5,
        phase: Math.random() * Math.PI * 2,
        targetAlpha
      });
    }

    app.ticker.add((ticker) => {
      const time = performance.now() / 1000;
      const height = app.screen.height;

      particles.forEach(p => {
        // Rise
        p.sprite.y -= p.speed * ticker.deltaTime;

        // Sway
        p.sprite.x += Math.sin(time + p.phase) * 0.3;

        // Wrap around
        if (p.sprite.y < -10) {
          p.sprite.y = height + 10;
          p.sprite.x = Math.random() * app.screen.width;
        }

        // Fade in/out at edges
        if (p.sprite.y > height * 0.8) {
          // Fade in bottom 20%
          const progress = (height - p.sprite.y) / (height * 0.2);
          p.sprite.alpha = p.targetAlpha * progress;
        } else if (p.sprite.y < height * 0.2) {
          // Fade out top 20%
          const progress = p.sprite.y / (height * 0.2);
          p.sprite.alpha = p.targetAlpha * Math.max(0, progress);
        } else {
          p.sprite.alpha = p.targetAlpha;
        }
      });
    });

    return () => {
      // Don't destroy PIXI.Texture.WHITE — it's a shared singleton
    };
  }, []);

  return (
    <section id="cta-section" className="relative py-32 px-4 bg-bg-primary overflow-hidden flex flex-col items-center justify-center min-h-[70vh]" ref={sectionRef}>
      {/* Gradient Transition from Pricing */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-bg-secondary to-transparent z-20 pointer-events-none" />

      <PixiCanvas onInit={initPixi} />

      <div className="max-w-3xl w-full text-center relative z-10">
        <div className="flex flex-col items-center">
          <h2 className="text-5xl md:text-6xl lg:text-7xl text-white mb-8 drop-shadow-[4px_4px_0px_#E40058] will-change-[transform,opacity]" ref={titleRef}>
            冒険に出よう！
          </h2>

          <div className="w-full max-w-xl mb-12 text-left">
            <PrepPointBox
              title="最後に"
              icon="!"
              variant="primary"
              className="mt-0 mb-0 shadow-[8px_8px_0px_0px_#E40058]"
            >
              <div className="text-lg md:text-xl font-bold mb-4 text-center">
                コーヒー1杯より安い、あなただけの武器屋。
              </div>
              <CheckList
                items={[
                  "毎日AIが選んだスキャンダル記事が届く",
                  "YouTube Shorts特化のタイトル案付き",
                  "月額たったの数千円で時間が買える！"
                ]}
                icon="✔"
                iconColor="text-accent-gold"
              />
            </PrepPointBox>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full" ref={buttonsRef}>
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
