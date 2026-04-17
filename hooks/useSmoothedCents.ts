import { smoothEMA } from "@/utils/noteUtils";
import { useEffect, useRef, useState } from "react";

const DEAD_ZONE = 3;
const IDLE_TIMEOUT_MS = 3000;

/**
 * Utilizes the EMA filtering equation in order to
 * smooth out flickerings with frequency changes
 *
 * Dead zone of 3 cents in order to only change if a 3cents delta occurs.
 * Resets to 0 after 5s of no detected signal.
 * */
export function useSmoothedCents(
    rawCents: number,
    frequency: number | null,
    smoothing: number = 0.15,
): number {
    const [displayCents, setDisplayCents] = useState(0);
    const smoothedRef = useRef(0);
    const displayRef = useRef(0);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }

        if (!frequency) {
            timeoutRef.current = setTimeout(() => {
                smoothedRef.current = 0;
                displayRef.current = 0;
                setDisplayCents(0);
            }, IDLE_TIMEOUT_MS);
            return () => {
                if (timeoutRef.current) clearTimeout(timeoutRef.current);
            };
        }

        smoothedRef.current = smoothEMA(smoothedRef.current, rawCents, smoothing);
        const rounded = Math.round(smoothedRef.current);

        if (Math.abs(rounded - displayRef.current) >= DEAD_ZONE) {
            displayRef.current = rounded;
            setDisplayCents(rounded);
        }
    }, [frequency, rawCents]);

    return displayCents;
}
