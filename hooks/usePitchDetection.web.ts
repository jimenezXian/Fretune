import { BUFFER_SIZE, MAX_MUSICAL_PITCH_FREQUENCY_HZ, MIN_MUSICAL_PITCH_FREQUENCY_HZ, THROTTLE_MS } from '@/constants/pitch';
import { IPitchDetectionResult } from '@/types/pitch';
import { useIsFocused } from '@react-navigation/native';
import { ACF2PLUS } from 'pitchfinder';
import { useEffect, useRef, useState } from 'react';

export function usePitchDetection(): IPitchDetectionResult {
    /* ******************** Hooks ******************** */
    const isFocused = useIsFocused();

    const [frequency, setFrequency] = useState<number | null>(null);
    const [isActive, setIsActive] = useState(false);
    const [hasPermission, setHasPermission] = useState(false);

    const lastEmitRef = useRef<number>(0);

    /* ******************** Effects ******************** */
    useEffect(() => {
        if (!isFocused) return;

        let isMounted = true;
        let teardown: (() => void) | undefined;

        const init = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                if (!isMounted) {
                    stream.getTracks().forEach(t => t.stop());
                    return;
                }
                setHasPermission(true);

                const audioCtx = new AudioContext();
                if (audioCtx.state === 'suspended') await audioCtx.resume();

                const source = audioCtx.createMediaStreamSource(stream);
                const analyser = audioCtx.createAnalyser();
                analyser.fftSize = BUFFER_SIZE;
                source.connect(analyser);

                const detectPitch = ACF2PLUS({ sampleRate: audioCtx.sampleRate });
                const buffer = new Float32Array(BUFFER_SIZE);
                let rafId: number;

                const loop = () => {
                    rafId = requestAnimationFrame(loop);

                    const now = Date.now();
                    if (now - lastEmitRef.current < THROTTLE_MS) return;
                    lastEmitRef.current = now;

                    analyser.getFloatTimeDomainData(buffer);
                    const pitch = detectPitch(buffer);

                    if (!isMounted) return;

                    const isInMusicalRange = pitch !== null
                        && pitch >= MIN_MUSICAL_PITCH_FREQUENCY_HZ
                        && pitch <= MAX_MUSICAL_PITCH_FREQUENCY_HZ;
                    setFrequency(isInMusicalRange ? pitch : null);
                };

                rafId = requestAnimationFrame(loop);
                setIsActive(true);

                teardown = () => {
                    cancelAnimationFrame(rafId);
                    analyser.disconnect();
                    source.disconnect();
                    audioCtx.close();
                    stream.getTracks().forEach(t => t.stop());
                };
            } catch {
                if (isMounted) setHasPermission(false);
            }
        };

        init();

        return () => {
            isMounted = false;
            teardown?.();
            setIsActive(false);
            setFrequency(null);
        };
    }, [isFocused]);

    return { frequency, isActive, hasPermission };
}
