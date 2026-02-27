import type { FC } from 'react';
import { RPGWindow } from './ui/RPGWindow';
import { SAMPLE_ARTICLES } from '../data/content';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const Sample: FC = () => {
  const { ref, isVisible } = useScrollReveal(0.2);

  return (
    <section className="py-20 px-4 bg-bg-secondary min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-4xl w-full" ref={ref}>
        <h2 className="text-3xl md:text-4xl text-center mb-12 text-white">
          ▼ 毎朝こんな感じで届きます
        </h2>

        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <RPGWindow title="[!] ITEM GET!" className="p-4 md:p-8">
            <div className="space-y-8">
              {SAMPLE_ARTICLES.map((article) => (
                <div key={article.id} className="border-b-2 border-dashed border-gray-600 pb-6 last:border-b-0 last:pb-0">
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
              ))}
            </div>
          </RPGWindow>
        </div>
      </div>
    </section>
  );
};
