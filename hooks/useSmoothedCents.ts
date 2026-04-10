import { smoothEMA } from "@/utils/noteUtils";
import { useEffect, useRef, useState } from "react";

const DEAD_ZONE = 3;

/**
 * Utilizes the EMA filtering equation in order to 
 * smooth out flickerings with frequency changes
 * 
 * Dead zone of 3 cents in order to only change if a 3cents delta occurs 
 * */
export function useSmoothedCents(
    rawCents: number,
    frequency: number | null,
    smoothing: number = 0.15,
): number {
    const [displayCents, setDisplayCents] = useState(0);
    const smoothedRef = useRef(0);

    useEffect(() => {
        if (!frequency) {
            smoothedRef.current = 0;
            setDisplayCents(0);
            return;
        }

        smoothedRef.current = smoothEMA(smoothedRef.current, rawCents, smoothing);
        const rounded = Math.round(smoothedRef.current);

        if (Math.abs(rounded - displayCents) >= DEAD_ZONE) {
            setDisplayCents(rounded);
        }
    }, [frequency]);

    return displayCents;
}
