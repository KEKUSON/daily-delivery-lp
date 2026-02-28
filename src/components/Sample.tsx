import type { FC } from 'react';
import { RPGWindow } from './ui/RPGWindow';
import { SAMPLE_ARTICLES } from '../data/content';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const Sample: FC = () => {
  const { ref, isVisible } = useScrollReveal(0.2);

  return (
    <section className="relative py-20 px-4 bg-bg-secondary min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Gradient Transition from Solution */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-bg-primary to-transparent z-20 pointer-events-none" />

      <div className="max-w-6xl w-full z-10" ref={ref}>
        <h2 className="text-2xl md:text-3xl text-center mb-12 text-white">
          <span aria-hidden="true">┌─ </span>毎朝こんな感じで届きます<span aria-hidden="true"> ─┐</span>
        </h2>

        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide">
            {SAMPLE_ARTICLES.map((article) => (
              <RPGWindow key={article.id} title="[!] ITEM GET!" className="p-4 md:p-8 min-w-[320px] md:min-w-[400px] shrink-0 snap-center">
                <div className="space-y-6">
                  <h3 className="text-xl text-accent-gold mb-2"><span aria-hidden="true">▶</span> {article.title}</h3>
                  <div className="text-sm text-accent-cyan mb-2 break-all">
                    URL: <a href={article.url} className="underline hover:text-white" target="_blank" rel="noopener noreferrer">{article.url}</a>
                  </div>
                  <div className="bg-black/30 p-3 rounded mb-4 text-sm text-gray-300">
                    概要: {article.summary}
                  </div>
                  
                  <div>
                    <h4 className="text-md text-white mb-2">台本タイトル案:</h4>
                    <ul className="space-y-1 pl-4">
                      {article.titleOptions.map((opt, i) => (
                        <li key={i} className="text-sm text-gray-300">
                          {String.fromCharCode(65 + i)}: {opt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </RPGWindow>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
