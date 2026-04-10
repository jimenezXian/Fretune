import { requestRecordingPermissionsAsync } from 'expo-audio';
import { useEffect, useRef, useState } from "react";
import Pitchy from 'react-native-pitchy';

//Straight from documentation https://www.npmjs.com/package/react-native-pitchy
const THROTTLE_MS = 50;
const BUFFER_SIZE = 4096;
const MIN_VOLUME = -60;

type PitchDetectionResult = {
    frequency: number | null;
    isActive: boolean;
    hasPermission: boolean;
}

export function usePitchDetection(): PitchDetectionResult {
    /* ******************** Hooks ******************** */
    const [frequency, setFrequency] = useState<number | null>(null);
    const [isActive, setIsActive] = useState(false);
    const [hasPermission, setHasPermission] = useState(false);

    const lastEmitRef = useRef<number>(0);
    /* ******************** Variables ******************** */
    /* ******************** Functions ******************** */
    /* ******************** Effects ******************** */
    /* ******************** JSX ******************** */
    useEffect(() => {
        let listenerCleanup: (() => void) | undefined;

        const init = async () => {
            const { granted } = await requestRecordingPermissionsAsync();
            setHasPermission(granted);
            
            if (!granted) return;

            Pitchy.init({
                bufferSize: BUFFER_SIZE,
                minVolume: MIN_VOLUME,
                algorithm: 'ACF2+',
            });

            await Pitchy.start();
            setIsActive(true);

            const subscription = Pitchy.addListener(({ pitch }) => {
                const now = Date.now();
                if (now - lastEmitRef.current < THROTTLE_MS) return;
                lastEmitRef.current = now;

                setFrequency(pitch > 0 ? pitch : null);
            });

            listenerCleanup = () => subscription.remove();
        };

        init();

        return () => {
            listenerCleanup?.();
            Pitchy.stop();
            setIsActive(false);
            setFrequency(null);
        };
    }, []);

    return { frequency, isActive, hasPermission };
};