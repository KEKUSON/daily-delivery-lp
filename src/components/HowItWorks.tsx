import { useRef } from 'react';
import type { FC } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { PrepPointBox } from './ui/PrepPointBox';

export const HowItWorks: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const steps = gsap.utils.toArray('.how-step') as HTMLElement[];
      const arrows = gsap.utils.toArray('.how-arrow') as HTMLElement[];

      gsap.set(steps, { opacity: 0, x: -30 });
      gsap.set(arrows, { opacity: 0 });

      gsap.to(steps, {
        opacity: 1,
        x: 0,
        stagger: 0.3,
        duration: 0.5,
        ease: "steps(3)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none none"
        }
      });

      gsap.to(arrows, {
        opacity: 1,
        stagger: 0.2,
        duration: 0.3,
        ease: "steps(2)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none none"
        }
      });
    });

    mm.add("(max-width: 767px)", () => {
      const steps = gsap.utils.toArray('.how-step') as HTMLElement[];

      gsap.set(steps, { opacity: 0, y: 20 });

      gsap.to(steps, {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 0.4,
        ease: "steps(3)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  const steps = [
    {
      step: 'STEP 1',
      title: 'プランを選んで登録',
      description: '「自分史上最強の武器」を選んでください。3つのプランから選べます。',
      icon: '📋'
    },
    {
      step: 'STEP 2',
      title: '毎朝AIが記事を厳選',
      description: 'スキャンダル・炎上ニュースをAIが独自判定。9時までにChatwork/LINEに届ける。',
      icon: '📬'
    },
    {
      step: 'STEP 3',
      title: 'タイトル案を選んで動画にする',
      description: '最大3つのタイトル案付き。選ぶだけで動画制作開始！',
      icon: '🎬'
    }
  ];

  return (
    <section id="how-section" className="py-20 px-4 bg-bg-secondary relative" ref={containerRef}>
      <div className="max-w-5xl mx-auto z-10 relative">
        <h2 className="text-3xl md:text-4xl text-center text-accent mb-12 drop-shadow-[4px_4px_0px_#E40058]">
          <span aria-hidden="true">▶</span> ゲームの始め方 <span aria-hidden="true">▶</span>
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
          {steps.map((s, index) => (
            <div key={s.step} className="how-step flex items-center">
              <PrepPointBox
                title={s.step}
                icon={s.icon}
                variant={index === 1 ? 'accent' : 'primary'}
                className="w-full max-w-sm"
              >
                <h3 className="text-xl text-white font-bold mb-2">{s.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{s.description}</p>
              </PrepPointBox>

              {index < steps.length - 1 && (
                <div className="how-arrow hidden md:flex text-accent-gold text-3xl mx-2 shrink-0">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
