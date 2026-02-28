import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

interface NumberTickerProps {
    value: number;
    delay?: number;
}

export function NumberTicker({ value, delay = 0.3 }: NumberTickerProps) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        if (prefersReducedMotion) {
            setCount(value);
            return;
        }

        if (isInView) {
            const timeout = setTimeout(() => {
                let startTime: number;
                const step = (timestamp: number) => {
                    if (!startTime) startTime = timestamp;
                    const progress = Math.min((timestamp - startTime) / 1500, 1);

                    setCount(Math.floor(progress * value));

                    if (progress < 1) {
                        requestAnimationFrame(step);
                    } else {
                        setCount(value);
                    }
                };
                requestAnimationFrame(step);
            }, delay * 1000);
            return () => clearTimeout(timeout);
        }
    }, [isInView, value, delay, prefersReducedMotion]);

    return <span ref={ref}>{count}</span>;
}
