import { BUFFER_SIZE, MAX_MUSICAL_PITCH_FREQUENCY_HZ, MIN_MUSICAL_PITCH_FREQUENCY_HZ, THROTTLE_MS } from '@/constants/pitch';
import { PitchDetectionResult } from '@/types/pitch';
import * as PitchFinder from 'pitchfinder';
import { useEffect, useRef, useState } from 'react';

export function usePitchDetection(): PitchDetectionResult {
    const [frequency, setFrequency] = useState<number | null>(null);
    const [isActive, setIsActive] = useState(false);
    const [hasPermission, setHasPermission] = useState(false);

    const lastEmitRef = useRef<number>(0);
    const cleanupRef = useRef<(() => void) | null>(null);

    useEffect(() => {
        let isMounted = true;

        const init = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                if (!isMounted) {
                    stream.getTracks().forEach(t => t.stop());
                    return;
                }

                setHasPermission(true);

                const audioCtx = new AudioContext();
                const source = audioCtx.createMediaStreamSource(stream);

                // ScriptProcessorNode is deprecated but has wide support;
                // swap for AudioWorklet if you need future-proofing
                const processor = audioCtx.createScriptProcessor(BUFFER_SIZE, 1, 1);
                const detectPitch = PitchFinder.ACF2PLUS({ sampleRate: audioCtx.sampleRate });

                processor.onaudioprocess = (e) => {
                    const now = Date.now();
                    if (now - lastEmitRef.current < THROTTLE_MS) return;
                    lastEmitRef.current = now;

                    const buffer = e.inputBuffer.getChannelData(0);
                    const pitch = detectPitch(buffer);

                    if (!isMounted) return;

                    const isInRange = pitch !== null && pitch >= MIN_MUSICAL_PITCH_FREQUENCY_HZ && pitch <= MAX_MUSICAL_PITCH_FREQUENCY_HZ;
                    setFrequency(isInRange ? pitch : null);
                };

                source.connect(processor);
                processor.connect(audioCtx.destination);
                setIsActive(true);

                cleanupRef.current = () => {
                    processor.disconnect();
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
            cleanupRef.current?.();
            cleanupRef.current = null;
            setIsActive(false);
            setFrequency(null);
        };
    }, []);

    return { frequency, isActive, hasPermission };
}