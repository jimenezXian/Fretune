import { smoothEMA } from "@/utils/noteUtils";
import { useEffect, useRef, useState } from "react";

const DEAD_ZONE_CENTS = 3;
const IDLE_TIMEOUT_MS = 3000;

/**
 * Smooths raw cent readings using EMA (Exponential Moving Average) filtering
 * to reduce jitter from frame-to-frame pitch detection noise.
 *
 * - Dead zone: suppresses updates smaller than 3delta cents to prevent UI flicker
 * - Idle timeout: resets to 0 after 3s of no signal
 */
export function useSmoothedCents(
    rawCents: number,
    frequency: number | null,
    alpha: number = 0.15,
): number {
    const [displayCents, setDisplayCents] = useState(0);
    const smoothedRef = useRef(0);
    const displayRef = useRef(0);
    const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    /* ******************** Functions ******************** */
    function clearIdleTimer() {
        if (idleTimerRef.current) {
            clearTimeout(idleTimerRef.current);
            idleTimerRef.current = null;
        }
    }

    function startIdleTimer() {
        idleTimerRef.current = setTimeout(() => {
            smoothedRef.current = 0;
            displayRef.current = 0;
            setDisplayCents(0);
        }, IDLE_TIMEOUT_MS);
    }

    /* ******************** Effects ******************** */
    useEffect(() => {
        clearIdleTimer();

        if (!frequency) {
            startIdleTimer();
            return clearIdleTimer;
        }

        smoothedRef.current = smoothEMA(smoothedRef.current, rawCents, alpha);
        const rounded = Math.round(smoothedRef.current);

        if (Math.abs(rounded - displayRef.current) >= DEAD_ZONE_CENTS) {
            displayRef.current = rounded;
            setDisplayCents(rounded);
        }
    }, [frequency, rawCents]);



    return displayCents;
}
