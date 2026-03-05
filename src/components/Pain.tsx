import { useRef } from 'react';
import type { FC } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SpeechBalloon } from './ui/SpeechBalloon';
import { PAIN_POINTS } from '../data/content';
import npcVillageA from '../assets/sprites/npc_face.webp';
import npcVillageB from '../assets/sprites/npc_face_2.webp';
import npcVillageC from '../assets/sprites/npc_face_3.webp';
import npcVillageD from '../assets/sprites/Gemini_Generated_Image_nw1i3xnw1i3xnw1i.webp';
import npcVillageE from '../assets/sprites/Gemini_Generated_Image_zdwd54zdwd54zdwd.webp';
import heroBg from '../assets/infographics/hero.webp';

const npcFaces = [npcVillageA, npcVillageB, npcVillageC, npcVillageD, npcVillageE];

export const Pain: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Parallax for background image
      gsap.to('.hero-bg', {
        y: 100,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

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

      gsap.from(".pain-card", {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.3,
        ease: "steps(4)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
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

      gsap.from(".pain-card", {
        y: 20,
        opacity: 0,
        duration: 0.4,
        stagger: 0.15,
        ease: "steps(4)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section id="pain-section" className="relative py-20 px-4 bg-bg-secondary min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt=""
          className="hero-bg w-full h-full object-cover opacity-20"
          onError={(e) => e.currentTarget.style.display = 'none'}
        />
      </div>

      {/* Gradient Transition from Hero */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-bg-primary to-transparent z-10 pointer-events-none"></div>

      <div className="max-w-3xl w-full z-20" ref={containerRef}>
        <h2 ref={titleRef} className="text-3xl sm:text-4xl md:text-5xl text-center mb-12 text-accent-cyan animate-pulse break-keep whitespace-nowrap">
          <span aria-hidden="true">┌─ </span>こんな悩み、ありませんか？<span aria-hidden="true"> ─┐</span>
        </h2>

        <div className="space-y-4 md:space-y-8">
          {PAIN_POINTS.map((pain, index) => {
            const isEven = index % 2 === 1;
            return (
              <div
                key={pain.id}
                className="pain-card w-full flex justify-center"
              >
                <div className="w-full sm:w-[95%] md:w-[85%]">
                  <SpeechBalloon
                    avatarSrc={npcFaces[index % npcFaces.length]}
                    avatarAlt={`悩みを抱える村人 ${String.fromCharCode(65 + index)}`}
                    direction={isEven ? 'right' : 'left'}
                    name={`村人 ${String.fromCharCode(65 + index)}`}
                  >
                    <div className="text-xl sm:text-2xl md:text-3xl font-retro pt-1 break-keep">
                      「{pain.text}」
                    </div>
                  </SpeechBalloon>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
