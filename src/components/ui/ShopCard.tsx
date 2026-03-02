import type { FC } from 'react';
import type { Product } from '../../types';
import { cn } from '../../lib/utils';
import { BorderBeam } from './BorderBeam';

interface ShopCardProps {
  product: Product;
}

export const ShopCard: FC<ShopCardProps> = ({ product }) => {
  const isHighlight = product.highlight;

  return (
    <div className="relative pt-6">
      {isHighlight && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-accent-gold text-black px-3 py-1 border-2 border-white font-bold font-retro z-10 motion-safe:animate-[float_3s_ease-in-out_infinite]">
          ★ おすすめ
        </div>
      )}
      <div
        className={cn(
          "relative p-6 font-retro transition-transform duration-200 [transition-timing-function:steps(3,end)]",
          "border-4 [clip-path:polygon(4px_0,calc(100%-4px)_0,100%_4px,100%_calc(100%-4px),calc(100%-4px)_100%,4px_100%,0_calc(100%-4px),0_4px)]",
          isHighlight
            ? "bg-bg-card border-accent-gold transform scale-105 z-10 hover:scale-110 hover:shadow-[8px_8px_0px_0px_#F8B800] motion-reduce:transform-none"
            : "bg-bg-secondary border-white hover:scale-105 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_#F8B800] motion-reduce:transform-none"
        )}
      >
        {isHighlight && (
          <BorderBeam className="-inset-1" size={80} duration={4} borderWidth={4} colorFrom="#F8B800" colorTo="#00E8D8" />
        )}

        <div className="text-center mb-4">
          <div className="text-4xl mb-2">{product.icon}</div>
          <h3 className="text-2xl mb-2">{product.name}</h3>
          <div className="text-accent-gold text-3xl font-bold">
            ¥{product.price}
            <span className="text-lg text-text-muted">/{product.unit}</span>
          </div>
        </div>

        <div className="border-t-2 border-dashed border-white my-4" />

        <div className="text-center mb-4 text-base text-accent-cyan">
          「{product.description}」
        </div>

        <ul className="space-y-2 mb-6 text-base">
          {product.features.map((feature) => (
            <li key={feature} className="flex items-center gap-2">
              <span className="text-accent" aria-hidden="true">▶</span> {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
