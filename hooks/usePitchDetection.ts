import { BUFFER_SIZE, MAX_MUSICAL_PITCH_FREQUENCY_HZ, MIN_MUSICAL_PITCH_FREQUENCY_HZ, MIN_VOLUME, THROTTLE_MS } from '@/constants/pitch';
import { PitchDetectionResult } from '@/types/pitch';
import { useIsFocused } from '@react-navigation/native';
import { requestRecordingPermissionsAsync } from 'expo-audio';
import { useEffect, useRef, useState } from "react";
import Pitchy from 'react-native-pitchy';


export function usePitchDetection(): PitchDetectionResult {
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
        let listenerCleanup: (() => void) | undefined;

        const init = async () => {
            const { granted } = await requestRecordingPermissionsAsync();
            if (!isMounted) return;
            setHasPermission(granted);
            if (!granted) return;

            Pitchy.init({
                bufferSize: BUFFER_SIZE,
                minVolume: MIN_VOLUME,
                algorithm: 'ACF2+',
            });

            await Pitchy.start();
            if (!isMounted) {
                Pitchy.stop();
                return;
            }
            setIsActive(true);

            const subscription = Pitchy.addListener(({ pitch }) => {
                const now = Date.now();
                if (now - lastEmitRef.current < THROTTLE_MS) return;
                lastEmitRef.current = now;

                const isInMusicalRange = pitch >= MIN_MUSICAL_PITCH_FREQUENCY_HZ && pitch <= MAX_MUSICAL_PITCH_FREQUENCY_HZ;
                setFrequency(isInMusicalRange ? pitch : null);
            });

            listenerCleanup = () => subscription.remove();
        };

        init();

        return () => {
            isMounted = false;
            listenerCleanup?.();
            Pitchy.stop();
            setIsActive(false);
            setFrequency(null);
        };
    }, [isFocused]);

    return { frequency, isActive, hasPermission };
};