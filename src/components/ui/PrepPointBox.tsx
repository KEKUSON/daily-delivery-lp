import type { FC, ReactNode } from 'react';
import { cn } from '../../lib/utils';
import { PixelContainer } from './PixelContainer';

interface PrepPointBoxProps {
    children: ReactNode;
    title?: string;
    icon?: string;
    className?: string;
    variant?: 'primary' | 'accent';
}

export const PrepPointBox: FC<PrepPointBoxProps> = ({
    children,
    title = "POINT",
    icon = "◆",
    className,
    variant = 'primary'
}) => {
    return (
        <div className="relative pt-4 mb-6">
            <div
                className={cn(
                    "absolute top-0 left-4 z-10 px-3 py-1 text-sm border-2 font-bold flex items-center gap-2 font-retro",
                    variant === 'primary'
                        ? "bg-black text-white border-white"
                        : "bg-accent-gold text-black border-accent-gold"
                )}
            >
                <span aria-hidden="true" className="animate-pulse">{icon}</span>
                {title}
            </div>
            <PixelContainer
                className={cn(
                    "p-6 border-2",
                    variant === 'primary' ? "bg-bg-card border-white" : "bg-bg-secondary border-accent-gold",
                    className
                )}
            >
                <div className="text-text leading-relaxed mt-2">
                    {children}
                </div>
            </PixelContainer>
        </div>
    );
};
