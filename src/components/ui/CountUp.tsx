import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

interface CountUpProps {
    end: number;
    duration?: number;
}

export function CountUp({ end, duration = 1.5 }: CountUpProps) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        if (prefersReducedMotion) {
            setCount(end);
            return;
        }

        if (isInView) {
            let startTime: number;
            const step = (timestamp: number) => {
                if (!startTime) startTime = timestamp;
                const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

                setCount(Math.floor(progress * end));

                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    setCount(end);
                }
            };

            requestAnimationFrame(step);
        }
    }, [isInView, end, duration, prefersReducedMotion]);

    return <span ref={ref}>{count}</span>;
}
