import { useEffect, useState, useRef, useCallback } from 'react';
import type { FC, MouseEvent } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import * as PIXI from 'pixi.js';
import { PixelButton } from './ui/PixelButton';
import { PixiCanvas } from './ui/PixiCanvas';
import heroMain from '../assets/infographics/hero_main.png';
import { LINKS } from '../data/content';

const FULL_TEXT = "毎日のネタ探し、まだ自分でやってんの？";

export const Hero: FC = () => {
  const [text, setText] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
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
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    setIsMobile(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Parallax for background image
      gsap.to('.hero-bg', {
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

  const initPixi = useCallback((app: PIXI.Application) => {
    const isMob = window.matchMedia('(max-width: 767px)').matches;
    const numStars = isMob ? 80 : 200;

    const starsContainer = new PIXI.Container();
    app.stage.addChild(starsContainer);

    // Use built-in white texture for optimization
    const starTexture = PIXI.Texture.WHITE;

    const stars: { sprite: PIXI.Sprite, phase: number, speed: number, baseX: number, baseY: number }[] = [];

    for (let i = 0; i < numStars; i++) {
      const sprite = new PIXI.Sprite(starTexture);

      // Random position
      const baseX = Math.random() * app.screen.width;
      const baseY = Math.random() * app.screen.height;
      sprite.x = baseX;
      sprite.y = baseY;

      // Random size (1 to 3 pixels)
      const size = Math.floor(Math.random() * 3) + 1;
      sprite.width = size;
      sprite.height = size;

      // Initial alpha
      sprite.alpha = Math.random();

      starsContainer.addChild(sprite);

      stars.push({
        sprite,
        phase: Math.random() * Math.PI * 2,
        speed: 0.02 + Math.random() * 0.03,
        baseX,
        baseY
      });
    }

    // Optional: Shooting stars with object pooling
    const shootingStarsContainer = new PIXI.Container();
    app.stage.addChild(shootingStarsContainer);

    // Pool of shooting stars
    const poolSize = 5;
    const shootingStarPool: (PIXI.Graphics & { speed: number, life: number, active: boolean })[] = [];

    for (let i = 0; i < poolSize; i++) {
      const ss = new PIXI.Graphics() as PIXI.Graphics & { speed: number, life: number, active: boolean };
      ss.moveTo(0, 0);
      ss.lineTo(40, -40); // Diagonal line
      ss.stroke({ color: 0xffffff, width: 2, alpha: 1 }); // Default color
      ss.active = false;
      ss.visible = false;
      shootingStarsContainer.addChild(ss);
      shootingStarPool.push(ss);
    }

    let shootingStarTimer = 0;
    const shootingStarThreshold = isMob ? 400 : 200; // Frames between shooting stars

    const activateShootingStar = () => {
      const inactiveStar = shootingStarPool.find(s => !s.active);
      if (inactiveStar) {
        inactiveStar.clear();
        inactiveStar.moveTo(0, 0);
        inactiveStar.lineTo(40, -40);
        inactiveStar.stroke({ color: Math.random() > 0.5 ? 0xffffff : 0x00E8D8, width: 2, alpha: 1 });

        inactiveStar.x = app.screen.width * 0.5 + Math.random() * app.screen.width * 0.5;
        inactiveStar.y = Math.random() * app.screen.height * 0.5;
        inactiveStar.speed = 15 + Math.random() * 10;
        inactiveStar.life = 60; // Frames to live
        inactiveStar.active = true;
        inactiveStar.visible = true;
      }
    };

    app.ticker.add((ticker) => {
      const time = performance.now() / 1000;

      // Twinkle animation
      stars.forEach(star => {
        star.sprite.alpha = 0.3 + Math.sin(time * 3 + star.phase) * 0.35;
      });

      // Mouse parallax for stars (Desktop only)
      let baseY = 0;
      if (!isMob && sectionRef.current) {
        const style = window.getComputedStyle(sectionRef.current);
        const mouseX = parseFloat(style.getPropertyValue('--mouse-x')) || 0;
        const mouseY = parseFloat(style.getPropertyValue('--mouse-y')) || 0;

        starsContainer.x = mouseX * -30;
        baseY = mouseY * -30;
      }

      // Scroll parallax for stars
      const scrollY = window.scrollY;
      starsContainer.y = baseY - scrollY * 0.1;

      // Reset positions if they go too far (due to scroll parallax)
      stars.forEach(star => {
        const actualY = star.baseY + starsContainer.y;
        if (actualY < -50) {
          star.baseY += app.screen.height + 100;
        } else if (actualY > app.screen.height + 50) {
          star.baseY -= app.screen.height + 100;
        }
        star.sprite.y = star.baseY;
      });

      // Simple shooting star logic
      shootingStarTimer += ticker.deltaTime;
      if (shootingStarTimer > shootingStarThreshold) {
        shootingStarTimer = 0;
        activateShootingStar();
      }

      // Update active shooting stars
      shootingStarPool.forEach(ss => {
        if (ss.active) {
          ss.x -= ss.speed * ticker.deltaTime;
          ss.y += ss.speed * ticker.deltaTime;
          ss.life -= ticker.deltaTime;
          ss.alpha = ss.life / 60; // Fade out

          if (ss.life <= 0 || ss.x < -100 || ss.y > app.screen.height + 100) {
            ss.active = false;
            ss.visible = false;
          }
        }
      });
    });

    // Cleanup texture on destroy (not needed for PIXI.Texture.WHITE, but good practice if custom)
    return () => {
      // starTexture.destroy(true); // Don't destroy built-in white texture
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-bg-primary bg-noise"
      onMouseMove={handleMouseMove}
    >
      <PixiCanvas onInit={initPixi} />

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
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-retro mb-6 text-white h-24 sm:h-28 md:h-32 flex items-center break-keep">
            {text}
            <span className="animate-pulse ml-1" aria-hidden="true">_</span>
          </h1>

          <p className="text-xl md:text-2xl text-text-muted font-sans mb-10 max-w-2xl mx-auto leading-relaxed">
            スキャンダル速報を毎朝お届け。<br className="md:hidden" />
            ショート動画のネタ、もう困らない。
          </p>

          <PixelButton
            as="a"
            href={LINKS.form}
            target="_blank"
            rel="noopener noreferrer"
            pulse={true}
            className="w-full sm:w-auto text-2xl px-10 py-5"
          >
            <span aria-hidden="true">▶</span> はじめる
          </PixelButton>
        </div>
      </div>
    </section>
  );
};
