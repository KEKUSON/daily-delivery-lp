import { useState, useRef } from 'react';
import type { FC } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { RPGWindow } from './ui/RPGWindow';

interface FAQItem {
    id: string;
    question: string;
    answer: string;
}

const FAQS: FAQItem[] = [
    {
        id: 'q1',
        question: 'どんなジャンルのニュースが送られてくるの？',
        answer: '主にエンタメ、スキャンダル、時事ネタなど、YouTubeの「ゆっくり解説」や「ずんだもん」動画で伸びやすい、人間の"野次馬根性"を刺激するニュースを厳選しています。'
    },
    {
        id: 'q2',
        question: '台本づくりにどう役立つの？',
        answer: 'ニュースの概要だけでなく、「目を引くタイトル案」を複数添えてお届けします。ゼロから考える手間が省け、すぐに執筆や動画作成に取り掛かれます。'
    },
    {
        id: 'q3',
        question: '解約はいつでもできる？',
        answer: 'はい、いつでも可能です（※次回から魔法が解けます）。お問い合わせフォーム、またはメンバーズエリアからワンクリックでお手続きいただけます。'
    },
    {
        id: 'q4',
        question: '支払い方法は？',
        answer: '銀行振込、またはPayPalでのお支払いに対応しています。'
    },
    {
        id: 'q5',
        question: '届くのは何時ごろ？',
        answer: '毎朝9時までにChatworkまたはLINEでお届けします。'
    },
    {
        id: 'q6',
        question: 'スマホでも確認できる？',
        answer: 'はい。ChatworkアプリまたはLINEアプリでスマートフォンからも確認できます。'
    },
    {
        id: 'q7',
        question: 'エンタメ以外のジャンルにも対応？',
        answer: '現在はエンタメ・芸能スキャンダルに特化していますが、ご要望に応じてカスタマイズも可能です。お気軽にご相談ください。'
    }
];

export const FaqAccordion: FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [openId, setOpenId] = useState<string | null>(null);

    useGSAP(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
            gsap.from(".faq-item", {
                x: -20,
                opacity: 0,
                stagger: 0.1,
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

    const toggleAccordion = (id: string) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <section id="faq-section" className="py-20 px-4 bg-bg-secondary relative" ref={containerRef}>
            <div className="max-w-3xl mx-auto z-10 relative">
                <h2 className="text-3xl md:text-4xl text-center text-accent-cyan mb-12 drop-shadow-[4px_4px_0px_#4A90E2]">
                    <span aria-hidden="true">？</span> よくある質問 (Q&A) <span aria-hidden="true">？</span>
                </h2>

                <div className="space-y-4">
                    {FAQS.map((faq) => {
                        const isOpen = openId === faq.id;
                        return (
                            <div key={faq.id} className="faq-item">
                                <button
                                    onClick={() => toggleAccordion(faq.id)}
                                    className="w-full text-left focus:outline-none focus:ring-4 focus:ring-accent-gold"
                                    aria-expanded={isOpen}
                                    aria-controls={`faq-answer-${faq.id}`}
                                >
                                    <RPGWindow
                                        title={isOpen ? "[▼] 閉じる" : "[▶] 選択"}
                                        className="p-4 md:p-6 transition-colors hover:border-accent-gold cursor-pointer"
                                    >
                                        <div className="flex items-center">
                                            <span className="text-accent-gold mr-3">Q.</span>
                                            <span className="text-white text-xl">{faq.question}</span>
                                        </div>
                                    </RPGWindow>
                                </button>

                                {/* 8-bit style choppy animation wrapper */}
                                <div
                                    id={`faq-answer-${faq.id}`}
                                    className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[500px] mt-2 opacity-100' : 'max-h-0 opacity-0'}`}
                                    style={{ transitionTimingFunction: 'steps(5)' }} // Pixelated/choppy feel
                                >
                                    <div className="bg-bg-primary border-2 border-dashed border-accent-cyan/50 p-4 md:p-6 rounded font-retro text-base md:text-lg text-gray-300">
                                        <span className="text-accent-cyan mr-2 font-bold">A.</span>
                                        {faq.answer}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
