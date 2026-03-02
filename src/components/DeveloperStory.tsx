import { useRef } from 'react';
import type { FC } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export const DeveloperStory: FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
            // Typewriter effect approach 1: text content manipulation via GSAP TextPlugin
            // Since Pixi/GSAP might not have TextPlugin by default, we'll use a simpler
            // step-based opacity or scale reveal for individual characters/lines

            const lines = gsap.utils.toArray('.story-line') as HTMLElement[];

            gsap.set(lines, { opacity: 0 });

            gsap.to(lines, {
                opacity: 1,
                stagger: {
                    each: 0.8, // Slow reveal like ending credits
                },
                duration: 0.1, // Quick snap to visible
                ease: "steps(1)", // Instant appear
                scrollTrigger: {
                    trigger: textRef.current,
                    start: "top 60%",
                    end: "bottom 40%",
                    scrub: false,
                    toggleActions: "play none none none"
                }
            });

        });

        mm.add("(max-width: 767px)", () => {
            const lines = gsap.utils.toArray('.story-line') as HTMLElement[];
            gsap.set(lines, { opacity: 0 });
            gsap.to(lines, {
                opacity: 1,
                stagger: { each: 0.4 },
                duration: 0.1,
                ease: "steps(1)",
                scrollTrigger: {
                    trigger: textRef.current,
                    start: "top 75%",
                    toggleActions: "play none none none"
                }
            });
        });

        return () => mm.revert();
    }, { scope: containerRef });

    return (
        <section className="py-24 px-4 bg-black relative overflow-hidden" ref={containerRef}>
            {/* Scanline effect overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-20 pointer-events-none opacity-50"></div>

            <div className="max-w-3xl mx-auto z-10 relative flex flex-col items-center">
                <h2 className="text-2xl md:text-3xl text-center text-white mb-16 tracking-widest font-bold">
                    <span className="animate-pulse">_ </span>
                    DEVELOPER'S MESSAGE
                    <span className="animate-pulse"> _</span>
                </h2>

                {/* Dramatic text area */}
                <div ref={textRef} className="space-y-8 font-retro text-xl md:text-2xl text-center leading-relaxed text-gray-300">
                    <p className="story-line">
                        私自身、YouTubeディレクターとして
                    </p>
                    <p className="story-line">
                        毎日、血眼になってニュースを探し回っていました。
                    </p>

                    <div className="h-8"></div> {/* Spacer */}

                    <p className="story-line">
                        「あれ、今日ネタなくね？」
                    </p>
                    <p className="story-line text-red-400">
                        その焦燥感は、確実にクリエイターの寿命を削ります。
                    </p>

                    <div className="h-8"></div> {/* Spacer */}

                    <p className="story-line">
                        だからこそ、この仕組みを作りました。
                    </p>
                    <p className="story-line">
                        情報収集という「作業」をすべて自動化し、
                    </p>
                    <p className="story-line text-accent-gold font-bold">
                        あなたには「創る」ことだけに魔法の時間を費やしてほしい。
                    </p>

                    <div className="h-16"></div> {/* Spacer */}

                    <p className="story-line text-xs tracking-widest uppercase">
                        - THE END OF MANUAL RESEARCH -
                    </p>
                </div>
            </div>
        </section>
    );
};
