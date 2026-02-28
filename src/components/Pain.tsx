import type { FC } from 'react';
import { RPGWindow } from './ui/RPGWindow';
import { PAIN_POINTS } from '../data/content';
import { useScrollReveal } from '../hooks/useScrollReveal';
import npcFace1 from '../assets/sprites/npc_face.png';
import npcFace2 from '../assets/sprites/npc_face_2.png';
import npcFace3 from '../assets/sprites/npc_face_3.png';

export const Pain: FC = () => {
  const { ref, isVisible } = useScrollReveal(0.2);
  const npcFaces = [npcFace1, npcFace2, npcFace3];

  return (
    <section id="pain-section" className="relative py-20 px-4 bg-bg-secondary min-h-screen flex flex-col items-center justify-center">
      {/* Gradient Transition from Hero */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-bg-primary to-transparent z-10 pointer-events-none"></div>

      <div className="max-w-3xl w-full z-20" ref={ref}>
        <h2 className="text-2xl md:text-3xl text-center mb-12 text-accent-cyan animate-pulse">
          <span aria-hidden="true">┌─ </span>こんな悩み、ありませんか？<span aria-hidden="true"> ─┐</span>
        </h2>

        <div className="space-y-6">
          {PAIN_POINTS.map((pain, index) => (
            <div
              key={pain.id}
              className={`transition-all duration-700 [transition-timing-function:steps(4,end)] transform ${isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
                }`}
              style={{ transitionDelay: `${index * 300}ms` }}
            >
              <RPGWindow className="flex items-start gap-4">
                <div className="w-16 h-16 shrink-0 border-2 border-white rounded bg-black/50 overflow-hidden">
                  <img
                    src={npcFaces[index % npcFaces.length]}
                    alt={`悩む村人 ${index + 1}`}
                    className="w-full h-full object-cover pixelated"
                  />
                </div>
                <div className="text-lg md:text-xl py-2">
                  「{pain.text}」
                </div>
              </RPGWindow>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
