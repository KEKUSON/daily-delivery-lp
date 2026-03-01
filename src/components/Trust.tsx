import { useRef } from 'react';
import type { FC } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { StatusBar } from './ui/StatusBar';
import { PixelContainer } from './ui/PixelContainer';
import { CountUp } from './ui/CountUp';
import { SpeechBalloon } from './ui/SpeechBalloon';

export const Trust: FC = () => {
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

      gsap.from(".trust-card", {
        scale: 0.95,
        opacity: 0,
        duration: 0.8,
        ease: "steps(4)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
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

      gsap.from(".trust-card", {
        scale: 0.95,
        opacity: 0,
        duration: 0.5,
        ease: "steps(4)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section id="trust-section" className="relative py-20 px-4 bg-bg-primary min-h-screen flex flex-col items-center justify-center overflow-hidden" ref={containerRef}>
      {/* Gradient Transition from Sample */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-bg-secondary to-transparent z-20 pointer-events-none" />

      <div className="max-w-3xl w-full z-10">
        <h2 ref={titleRef} className="text-3xl md:text-4xl text-center mb-12 text-white">
          <span aria-hidden="true">┌─ </span>パーティのステータス<span aria-hidden="true"> ─┐</span>
        </h2>

        <div className="trust-card">
          <PixelContainer className="bg-bg-card border-4 border-white p-8">
            <div className="text-center mb-8">
              <div className="text-xl text-accent-gold mb-2">実績解除済</div>
              <div className="text-2xl font-bold text-white">
                「登録者10万人チャンネルに提供中」
              </div>
            </div>

            <div className="border-t-2 border-dashed border-gray-600 my-6"></div>

            <div className="space-y-6 max-w-md mx-auto">
              <StatusBar
                label="収集力"
                level={12}
                value={8}
                maxValue={10}
                variant="blue"
              />
              <StatusBar
                label="速度"
                level={15}
                value={9}
                maxValue={10}
                variant="green"
              />
              <StatusBar
                label="精度"
                level={13}
                value={8}
                maxValue={10}
                variant="purple"
              />
            </div>

            <div className="text-center mt-8 text-xs text-text-muted">
              ※ 実績データに基づく能力値です
            </div>
          </PixelContainer>
        </div>

        {/* 数値実績 */}
        <div className="trust-stats mt-12">
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl text-accent-gold font-bold">
                <CountUp end={90} suffix="日+" duration={2} />
              </div>
              <div className="text-sm text-text-muted mt-2 font-retro">累計配信日数</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl text-accent-cyan font-bold">
                <CountUp end={500} suffix="+" duration={2} />
              </div>
              <div className="text-sm text-text-muted mt-2 font-retro">配信記事総数</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl text-accent font-bold">
                <CountUp end={5} suffix="+" duration={2} />
              </div>
              <div className="text-sm text-text-muted mt-2 font-retro">利用チャンネル数</div>
            </div>
          </div>
        </div>

        {/* ユーザーの声 */}
        <div className="trust-testimonials mt-16 space-y-8 max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-xl text-white font-retro">
              <span aria-hidden="true">「</span>プレイヤーの声<span aria-hidden="true">」</span>
            </h3>
          </div>

          <SpeechBalloon
            avatarSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23333' width='100' height='100'/%3E%3Ctext x='50' y='60' text-anchor='middle' fill='%23666' font-size='40'%3E?%3C/text%3E%3C/svg%3E"
            avatarAlt="ユーザーA"
            name="YouTuber A様"
          >
            毎朝Chatworkに届くから、探す時間がゼロになりました！
            おかげで動画作成の時間が増えました。
          </SpeechBalloon>

          <SpeechBalloon
            avatarSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23333' width='100' height='100'/%3E%3Ctext x='50' y='60' text-anchor='middle' fill='%23666' font-size='40'%3E?%3C/text%3E%3C/svg%3E"
            avatarAlt="ユーザーB"
            direction="right"
            name="チャンネル登録者5万人"
          >
            タイトル案がそのまま使えるレベルで助かってます！
            炎上トレンド逃さないのが凄いです。
          </SpeechBalloon>
        </div>
      </div>
    </section>
  );
};
