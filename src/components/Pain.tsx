import { useRef } from 'react';
import type { FC } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SpeechBalloon } from './ui/SpeechBalloon';
import { PAIN_POINTS } from '../data/content';
import npcFace1 from '../assets/sprites/npc_face.png';
import npcFace2 from '../assets/sprites/npc_face_2.png';
import npcFace3 from '../assets/sprites/npc_face_3.png';

const npcFaces = [npcFace1, npcFace2, npcFace3];

export const Pain: FC = () => {
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
    <section id="pain-section" className="relative py-20 px-4 bg-bg-secondary min-h-screen flex flex-col items-center justify-center">
      {/* Gradient Transition from Hero */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-bg-primary to-transparent z-10 pointer-events-none"></div>

      <div className="max-w-3xl w-full z-20" ref={containerRef}>
        <h2 ref={titleRef} className="text-3xl md:text-4xl text-center mb-12 text-accent-cyan animate-pulse">
          <span aria-hidden="true">┌─ </span>こんな悩み、ありませんか？<span aria-hidden="true"> ─┐</span>
        </h2>

        <div className="space-y-4 md:space-y-8">
          {PAIN_POINTS.map((pain, index) => {
            const isEven = index % 2 === 1;
            return (
              <div
                key={pain.id}
                className="pain-card w-full flex"
                style={{ justifyContent: isEven ? 'flex-end' : 'flex-start' }}
              >
                <div className="w-full md:w-[85%]">
                  <SpeechBalloon
                    avatarSrc={npcFaces[index % npcFaces.length]}
                    avatarAlt={`悩みを抱える村人 ${String.fromCharCode(65 + index)}`}
                    direction={isEven ? 'right' : 'left'}
                    name={`村人 ${String.fromCharCode(65 + index)}`}
                  >
                    <div className="text-xl md:text-2xl font-retro pt-1">
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
