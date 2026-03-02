import { useRef } from 'react';
import type { FC } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { PRODUCTS, PRICING_DESCRIPTION } from '../data/content';
import { ShopCard } from './ui/ShopCard';

export const Pricing: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      gsap.from(titleRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: "steps(3)",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });

      gsap.from(".shop-card", {
        y: 80,
        opacity: 0,
        scale: 0.85,
        duration: 0.7,
        stagger: 0.2,
        ease: "steps(5)",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });
    });

    mm.add("(max-width: 767px)", () => {
      gsap.from(titleRef.current, {
        y: 10,
        opacity: 0,
        duration: 0.4,
        ease: "steps(3)",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });

      gsap.from(".shop-card", {
        y: 40,
        opacity: 0,
        scale: 0.9,
        duration: 0.5,
        stagger: 0.15,
        ease: "steps(4)",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section id="pricing-section" className="relative py-20 px-4 bg-bg-secondary min-h-screen flex flex-col items-center justify-center overflow-hidden" ref={containerRef}>
      {/* Gradient Transition from Trust */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-bg-primary to-transparent z-20 pointer-events-none" />

      <div className="max-w-5xl w-full z-10">
        <div className="text-center mb-16" ref={titleRef}>
          <h2 className="text-4xl md:text-5xl text-white mb-4">
            <span aria-hidden="true">┌─ </span>[ SHOP ]<span aria-hidden="true"> ─┐</span>
          </h2>
          <p className="text-xl text-text-muted">
            {PRICING_DESCRIPTION}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-3xl mx-auto" ref={gridRef}>
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="shop-card"
            >
              <ShopCard product={product} />
            </div>
          ))}
        </div>

        <div className="text-center mt-12 text-lg text-text-muted font-retro">
          <p>まずは<span className="text-accent-gold font-bold">厳選ネタ1記事（100円）</span>からお試しください！</p>
        </div>
      </div>
    </section>
  );
};
