import type { FC } from 'react';
import { PixelButton } from './ui/PixelButton';
import { LINKS } from '../data/content';

export const MidCTA: FC = () => {
  return (
    <section className="py-12 px-4 bg-bg-primary text-center">
      <p className="text-xl text-text-muted mb-6 font-retro">
        気になったら、まずは無料お試しから。
      </p>
      <PixelButton
        as="a"
        href={LINKS.form}
        target="_blank"
        rel="noopener noreferrer"
        className="text-lg px-6 py-3"
      >
        <span aria-hidden="true">▶</span> 無料で試してみる
      </PixelButton>
    </section>
  );
};
