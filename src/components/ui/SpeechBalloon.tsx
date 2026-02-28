import type { FC, ReactNode } from 'react';
import { cn } from '../../lib/utils';
import { PixelContainer } from './PixelContainer';

interface SpeechBalloonProps {
    children: ReactNode;
    avatarSrc: string;
    avatarAlt: string;
    direction?: 'left' | 'right';
    className?: string;
    name?: string;
}

export const SpeechBalloon: FC<SpeechBalloonProps> = ({
    children,
    avatarSrc,
    avatarAlt,
    direction = 'left',
    className,
    name
}) => {
    const isLeft = direction === 'left';

    return (
        <div className={cn("flex items-start gap-4 md:gap-6 font-sans w-full", isLeft ? "flex-row" : "flex-row-reverse", className)}>
            <div className="flex flex-col items-center gap-2 shrink-0">
                <div className="w-16 h-16 md:w-20 md:h-20 border-2 border-white rounded bg-black overflow-hidden bg-noise">
                    <img
                        src={avatarSrc}
                        alt={avatarAlt}
                        className="w-full h-full object-cover pixelated"
                        loading="lazy"
                    />
                </div>
                {name && <span className="text-xs text-text-muted font-retro">{name}</span>}
            </div>

            <div className={cn("relative flex-1 max-w-2xl mt-2", isLeft ? "ml-2" : "mr-2")}>
                <PixelContainer className="bg-bg-card border-2 border-white p-4 md:p-6 text-sm md:text-base leading-relaxed relative">
                    {/* SWELL-like Speech Bubble Tail using a rotated square for retro pixel feel */}
                    <div
                        aria-hidden="true"
                        className={cn(
                            "absolute top-6 w-3 h-3 bg-bg-card border-white transform rotate-45 z-10",
                            isLeft
                                ? "-left-[7.5px] border-l-2 border-b-2"
                                : "-right-[7.5px] border-r-2 border-t-2"
                        )}
                    />

                    <div className="relative z-20">
                        {children}
                    </div>
                </PixelContainer>
            </div>
        </div>
    );
};
