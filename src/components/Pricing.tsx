import { PLANS, PRICING_DESCRIPTION } from '../data/content';
import { ShopCard } from './ui/ShopCard';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const Pricing: React.FC = () => {
  const { ref, isVisible } = useScrollReveal(0.2);

  return (
    <section className="py-20 px-4 bg-bg-secondary min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-5xl w-full" ref={ref}>
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl text-white mb-4">
            <span aria-hidden="true">┌─ </span>🛒 SHOP<span aria-hidden="true"> ─┐</span>
          </h2>
          <p className="text-xl text-text-muted">
            {PRICING_DESCRIPTION}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {PLANS.map((plan, index) => (
            <div 
              key={plan.id}
              className={`transition-all duration-700 ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-20'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <ShopCard plan={plan} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
