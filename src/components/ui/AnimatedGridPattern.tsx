import { useEffect, useId, useRef, useState, useMemo } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "../../lib/utils";

interface AnimatedGridPatternProps {
    numSquares?: number;
    maxOpacity?: number;
    duration?: number;
    repeatDelay?: number;
    className?: string;
    strokeWidth?: number;
}

export function AnimatedGridPattern({
    numSquares = 30,
    maxOpacity = 0.15,
    duration = 4,
    repeatDelay = 1,
    className,
    strokeWidth = 1,
    ...props
}: AnimatedGridPatternProps) {
    const id = useId();
    const containerRef = useRef<SVGSVGElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                setDimensions({
                    width: entry.contentRect.width,
                    height: entry.contentRect.height,
                });
            }
        });

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    const squares = useMemo(() => {
        if (dimensions.width === 0 || dimensions.height === 0 || prefersReducedMotion) {
            return [];
        }

        // adjust density for mobile based on width
        const currentNumSquares = dimensions.width < 768 ? Math.max(10, Math.floor(numSquares / 2)) : numSquares;

        const squaresList: [number, number, number][] = [];
        const size = 40;
        const cols = Math.ceil(dimensions.width / size);
        const rows = Math.ceil(dimensions.height / size);

        for (let i = 0; i < currentNumSquares; i++) {
            squaresList.push([
                Math.floor(Math.random() * cols),
                Math.floor(Math.random() * rows),
                Math.random() * duration
            ]);
        }
        return squaresList;
    }, [dimensions, prefersReducedMotion, numSquares, duration]);

    return (
        <svg
            ref={containerRef}
            aria-hidden="true"
            className={cn(
                "pointer-events-none absolute inset-0 h-full w-full",
                className,
            )}
            {...props}
        >
            <defs>
                <pattern
                    id={id}
                    width={40}
                    height={40}
                    patternUnits="userSpaceOnUse"
                    x="-1"
                    y="-1"
                >
                    <path
                        d={`M 40 0 L 0 0 0 40`}
                        fill="transparent"
                        stroke="currentColor"
                        strokeWidth={strokeWidth}
                    />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#${id})`} />
            <svg x="-1" y="-1" className="overflow-visible">
                {squares.map((square, index) => (
                    <motion.rect
                        initial={{ opacity: 0 }}
                        animate={{ opacity: maxOpacity }}
                        transition={{
                            duration,
                            repeat: Infinity,
                            delay: square[2],
                            repeatType: "reverse",
                            ease: (t: number) => Math.floor(t * 4) / 4,
                        }}
                        key={`${square[0]}-${square[1]}-${index}`}
                        width={39}
                        height={39}
                        x={square[0] * 40 + 1}
                        y={square[1] * 40 + 1}
                        fill="currentColor"
                        strokeWidth="0"
                    />
                ))}
            </svg>
        </svg>
    );
}
