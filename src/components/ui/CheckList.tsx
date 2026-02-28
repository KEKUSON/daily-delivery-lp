import type { FC, ReactNode } from 'react';
import { cn } from '../../lib/utils';
import { motion, useReducedMotion } from 'motion/react';

interface CheckListItemProps {
    children: ReactNode;
    icon?: string;
    iconColor?: string;
    delay?: number;
}

export const CheckListItem: FC<CheckListItemProps> = ({
    children,
    icon = "▶",
    iconColor = "text-accent",
    delay = 0
}) => {
    const prefersReducedMotion = useReducedMotion();

    return (
        <motion.li
            className="flex items-start gap-3 text-base md:text-lg"
            initial={prefersReducedMotion ? false : { opacity: 0, x: -10 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.3, delay, ease: (t: number) => Math.floor(t * 3) / 3 }}
        >
            <span className={cn("shrink-0 font-retro mt-1", iconColor)} aria-hidden="true">
                {icon}
            </span>
            <div className="leading-relaxed">
                {children}
            </div>
        </motion.li>
    );
};

interface CheckListProps {
    items: ReactNode[];
    icon?: string;
    iconColor?: string;
    className?: string;
}

export const CheckList: FC<CheckListProps> = ({
    items,
    icon,
    iconColor,
    className
}) => {
    return (
        <ul className={cn("space-y-4 font-sans", className)}>
            {items.map((item, index) => (
                <CheckListItem
                    key={index}
                    icon={icon}
                    iconColor={iconColor}
                    delay={index * 0.15}
                >
                    {item}
                </CheckListItem>
            ))}
        </ul>
    );
};
