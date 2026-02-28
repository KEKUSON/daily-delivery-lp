import { useRef } from 'react';
import type { FC } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { RPGWindow } from './ui/RPGWindow';

export const ComparisonTable: FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
            gsap.from(".comparison-row", {
                y: 20,
                opacity: 0,
                stagger: 0.15,
                duration: 0.5,
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
        <section className="py-20 px-4 bg-bg-primary relative" ref={containerRef}>
            <div className="max-w-4xl mx-auto z-10 relative">
                <h2 className="text-3xl md:text-4xl text-center text-accent-gold mb-12 drop-shadow-[4px_4px_0px_#F8B800]">
                    <span aria-hidden="true">▼</span> 圧倒的な差は歴然
                </h2>

                <RPGWindow title="ステータス比較" className="p-4 md:p-8">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left font-retro border-collapse">
                            <thead>
                                <tr className="border-b-4 border-accent-blue/50">
                                    <th className="p-4 w-1/3">項目</th>
                                    <th className="p-4 text-center text-gray-400 border-l-2 border-accent-blue/30 w-1/3">自力リサーチ</th>
                                    <th className="p-4 text-center text-accent-cyan border-l-2 border-accent-blue/30 w-1/3 text-xl bg-accent-blue/10">Daily Delivery</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="comparison-row border-b-2 border-gray-800">
                                    <td className="p-4 text-white">作業時間</td>
                                    <td className="p-4 text-center text-red-400 border-l-2 border-accent-blue/30 text-lg">
                                        毎日1〜2時間
                                    </td>
                                    <td className="p-4 text-center text-accent-gold font-bold border-l-2 border-accent-blue/30 text-xl bg-accent-blue/10">
                                        <span className="text-2xl mr-2">⭐</span>0秒 (完全自動)
                                    </td>
                                </tr>
                                <tr className="comparison-row border-b-2 border-gray-800">
                                    <td className="p-4 text-white">精神的疲労</td>
                                    <td className="p-4 text-center text-red-400 border-l-2 border-accent-blue/30 text-lg">
                                        💀 絶望的
                                    </td>
                                    <td className="p-4 text-center text-accent-cyan font-bold border-l-2 border-accent-blue/30 text-xl bg-accent-blue/10">
                                        <span className="text-2xl mr-2">⭐</span>皆無
                                    </td>
                                </tr>
                                <tr className="comparison-row border-b-2 border-gray-800">
                                    <td className="p-4 text-white">情報の鮮度</td>
                                    <td className="p-4 text-center text-gray-400 border-l-2 border-accent-blue/30">
                                        × 探し疲れて妥協
                                    </td>
                                    <td className="p-4 text-center text-accent-gold font-bold border-l-2 border-accent-blue/30 text-xl bg-accent-blue/10">
                                        <span className="text-2xl mr-2">○</span>毎朝最新をお届け
                                    </td>
                                </tr>
                                <tr className="comparison-row border-b-2 border-gray-800">
                                    <td className="p-4 text-white">台本化のしやすさ</td>
                                    <td className="p-4 text-center text-gray-400 border-l-2 border-accent-blue/30">
                                        × ゼロから考える
                                    </td>
                                    <td className="p-4 text-center text-accent-cyan font-bold border-l-2 border-accent-blue/30 text-xl bg-accent-blue/10">
                                        <span className="text-2xl mr-2">○</span>タイトル複数案つき
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </RPGWindow>
            </div>
        </section>
    );
};
