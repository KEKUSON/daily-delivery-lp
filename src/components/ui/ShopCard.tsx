import type { FC } from 'react';
import type { Plan } from '../../types';
import { cn } from '../../lib/utils';
import { BorderBeam } from './BorderBeam';
import { NumberTicker } from './NumberTicker';

interface ShopCardProps {
  plan: Plan;
}

export const ShopCard: FC<ShopCardProps> = ({ plan }) => {
  const isRecommended = plan.recommended;

  return (
    <div
      className={cn(
        "relative p-6 font-retro transition-transform duration-200 [transition-timing-function:steps(3,end)]",
        "border-4 hover:shadow-[8px_8px_0px_0px_#F8B800] [clip-path:polygon(4px_0,calc(100%-4px)_0,100%_4px,100%_calc(100%-4px),calc(100%-4px)_100%,4px_100%,0_calc(100%-4px),0_4px)]",
        isRecommended
          ? "bg-bg-card border-accent-gold transform scale-105 z-10 hover:scale-110 motion-reduce:transform-none motion-reduce:transition-none"
          : "bg-bg-secondary border-white hover:scale-105 hover:-translate-y-2 motion-reduce:transform-none motion-reduce:transition-none"
      )}
    >

      {isRecommended && (
        <BorderBeam
          className="-inset-1"
          size={80}
          duration={4}
          borderWidth={4}
          colorFrom="#F8B800"
          colorTo="#00E8D8"
        />
      )}

      {isRecommended && (
        <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-accent-gold text-black px-3 py-1 border-2 border-white font-bold motion-safe:animate-[float_3s_ease-in-out_infinite] z-30">
          ★ おすすめ
        </div>
      )}

      <div className="text-center mb-4">
        <h3 className="text-2xl mb-2 flex items-center justify-center gap-2">
          {plan.level != null && `[Lv.${plan.level}] `}
          {plan.name}
        </h3>
        <div className="text-accent-gold text-xl">
          <NumberTicker value={plan.price} delay={0.3} />G
          <span className="text-sm text-text-muted">/日</span>
        </div>
        <div className="text-sm text-text-muted mt-1">
          月額 ¥{plan.priceYen.toLocaleString()}（税込）
        </div>
      </div>

      <div className="border-t-2 border-dashed border-white my-4" />

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
