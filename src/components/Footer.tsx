import type { FC } from 'react';

export const Footer: FC = () => {
  return (
    <footer className="py-8 px-4 bg-black border-t-4 border-accent/30 text-center font-retro">
      <div className="max-w-3xl mx-auto space-y-4">
        <div className="text-text-muted text-base space-x-4">
          <a href="#" className="hover:text-white transition-colors">特定商取引法に基づく表記</a>
          <span>|</span>
          <a href="#" className="hover:text-white transition-colors">プライバシーポリシー</a>
        </div>
        <div className="text-text-muted text-sm">
          © 2026 Daily Delivery. All rights reserved.
        </div>
        <div className="text-sm text-gray-600">
          — THANK YOU FOR PLAYING —
        </div>
      </div>
    </footer>
  );
};
