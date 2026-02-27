import React from 'react';
import { StatusBar } from './ui/StatusBar';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { PixelContainer } from './ui/PixelContainer';

export const Trust: React.FC = () => {
  const { ref, isVisible } = useScrollReveal(0.2);

  return (
    <section className="py-20 px-4 bg-bg-primary min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-3xl w-full" ref={ref}>
        <h2 className="text-3xl md:text-4xl text-center mb-12 text-white">
          ▼ パーティのステータス
        </h2>

        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
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
              ※ ステータスは開発チームの意気込みを表しています
            </div>
          </PixelContainer>
        </div>
      </div>
    </section>
  );
};
