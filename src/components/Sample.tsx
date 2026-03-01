import { useRef } from 'react';
import type { FC } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { RPGWindow } from './ui/RPGWindow';
import { SAMPLE_ARTICLES } from '../data/content';
import { Marquee } from './ui/Marquee';
import { CheckList } from './ui/CheckList';

export const Sample: FC = () => {
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

      gsap.from(".sample-card", {
        x: 100,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
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

      gsap.from(".sample-card", {
        x: 50,
        opacity: 0,
        duration: 0.4,
        stagger: 0.1,
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
    <section id="sample-section" className="relative py-20 px-4 bg-bg-secondary min-h-screen flex flex-col items-center justify-center overflow-hidden" ref={containerRef}>
      {/* Gradient Transition from Solution */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-bg-primary to-transparent z-20 pointer-events-none" />

      <div className="max-w-6xl w-full z-10">
        <h2 ref={titleRef} className="text-2xl md:text-3xl text-center mb-12 text-white">
          <span aria-hidden="true">┌─ </span>毎朝こんな感じで届きます<span aria-hidden="true"> ─┐</span>
        </h2>

        <div>
          <Marquee pauseOnHover className="[--duration:30s] [--gap:1.5rem] md:[--duration:50s]">
            {SAMPLE_ARTICLES.map((article) => (
              <div key={article.id} className="sample-card min-w-[320px] md:min-w-[400px] shrink-0">
                <RPGWindow title="[!] ITEM GET!" className="p-4 md:p-8 h-full">
                  <div className="space-y-6">
                    <h3 className="text-xl text-accent-gold mb-2"><span aria-hidden="true">▶</span> {article.title}</h3>
                    {article.url !== '#' && (
                      <div className="text-sm text-accent-cyan mb-2 break-all">
                        URL: <a href={article.url} className="underline hover:text-white" target="_blank" rel="noopener noreferrer">{article.url}</a>
                      </div>
                    )}
                    <div className="bg-black/30 p-3 rounded mb-4 text-sm text-gray-300">
                      概要: {article.summary}
                    </div>

                    <div>
                      <h4 className="text-md text-white mb-3 bg-black/50 p-2 inline-block rounded">
                        <span aria-hidden="true" className="text-accent-gold">◆</span> 台本タイトル案:
                      </h4>
                      <CheckList
                        items={article.titleOptions.map((opt, i) => (
                          <span className="text-sm text-gray-300">
                            <strong className="text-white">案{String.fromCharCode(65 + i)}:</strong> {opt}
                          </span>
                        ))}
                        icon="▶"
                        iconColor="text-accent-cyan text-sm"
                        className="pl-2"
                      />
                    </div>
                  </div>
                </RPGWindow>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};
