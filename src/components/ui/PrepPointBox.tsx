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
        <PixelContainer
            className={cn(
                "relative mt-8 mb-6 p-6 border-2 font-retro",
                variant === 'primary' ? "bg-bg-card border-white" : "bg-bg-secondary border-accent-gold",
                className
            )}
        >
            <div
                className={cn(
                    "absolute -top-4 left-4 px-3 py-1 text-sm border-2 font-bold flex items-center gap-2",
                    variant === 'primary'
                        ? "bg-black text-white border-white"
                        : "bg-accent-gold text-black border-accent-gold"
                )}
            >
                <span aria-hidden="true" className="animate-pulse">{icon}</span>
                {title}
            </div>
            <div className="text-text leading-relaxed">
                {children}
            </div>
        </PixelContainer>
    );
};
