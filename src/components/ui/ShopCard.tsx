import type { FC } from 'react';
import type { Plan } from '../../types';

interface ShopCardProps {
  plan: Plan;
}

export const ShopCard: FC<ShopCardProps> = ({ plan }) => {
  const isRecommended = plan.recommended;

  return (
    <div className={`relative bg-bg-card border-4 ${isRecommended ? 'border-accent-gold transform scale-105 z-10' : 'border-white'} p-6 font-retro transition-all ${isRecommended ? 'hover:scale-110' : 'hover:scale-105'} hover:shadow-[8px_8px_0px_0px_#F8B800] [clip-path:polygon(4px_0,calc(100%-4px)_0,100%_4px,100%_calc(100%-4px),calc(100%-4px)_100%,4px_100%,0_calc(100%-4px),0_4px)]`}>


      {isRecommended && (
        <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-accent-gold text-black px-3 py-1 border-2 border-white font-bold animate-[float_3s_ease-in-out_infinite]">
          ★ おすすめ
        </div>
      )}

      <div className="text-center mb-4">
        <h3 className="text-2xl mb-2 flex items-center justify-center gap-2">
          {plan.level && `[Lv.${plan.level}]`}
          {plan.name}
        </h3>
        <div className="text-accent-gold text-xl">{plan.price}G<span className="text-sm text-text-muted">/日</span></div>
      </div>

      <div className="border-t-2 border-dashed border-white my-4"></div>

      <div className="text-center mb-4 text-sm text-accent-cyan">
        「{plan.description}」
      </div>

      <ul className="space-y-2 mb-6 text-sm">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-center gap-2">
            <span className="text-accent" aria-hidden="true">▶</span> {feature}
          </li>
        ))}
      </ul>
    </div>
  );
};
