import { useState, useEffect } from 'react';
import type { FC } from 'react';

export const Navbar: FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#pricing-section', label: '料金' },
    { href: '#faq-section', label: 'FAQ' },
    { href: '#cta-section', label: 'お問い合わせ' },
  ];

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300 [transition-timing-function:steps(4,end)]
        bg-bg-primary/90 backdrop-blur-sm border-b-2 border-accent/50
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}
      `}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="#" className="font-retro text-lg text-white hover:text-accent transition-colors">
          Daily Delivery
        </a>

        <ul className="flex items-center gap-4 md:gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-retro text-sm text-text-muted hover:text-white transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
