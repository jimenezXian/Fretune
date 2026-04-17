import { TColor, useColors } from "@/components/ui/theme";
import { useSmoothedCents } from "@/hooks/useSmoothedCents";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
    interpolateColor,
    useAnimatedProps,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";

import Svg, { Circle } from "react-native-svg";
import { Typography } from "../ui";

interface ITuneGauge {
    rawCents: number;
    isActive: boolean;

    /** Pass the raw frequency so the smoothing effect re-runs every audio frame */
    frequency: number | null;
    /** Lower = smoother/slower response (0-1, default 0.15) */
    smoothing?: number;
    /** Show feedback when within threshold (specifically for Note Tuner) */
    showInTune?: boolean;
}

const SPRINGINESS_CONFIG = { damping: 15, stiffness: 120 };
const TIMEOUT_DRIFT_CENTER_CONFIG = { damping: 30, stiffness: 15 };
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export function TuneGauge({ rawCents, isActive, frequency, smoothing = 0.15, showInTune = false }: ITuneGauge) {
    /* ******************** Hooks ******************** */
    const { $color } = useColors();

    const activeFrequency = isActive ? frequency : null;
    const needlePosition = useSharedValue(0);
    const displayCents = useSmoothedCents(rawCents, activeFrequency, smoothing);

    /* ******************** Variables ******************** */
    const centsInBounds = Math.max(-100, Math.min(100, displayCents));
    const absCents = Math.abs(displayCents);
    const isOutOfBounds = absCents > 100;
    const hasReading = displayCents !== 0;
    const isIdle = centsInBounds === 0 && !isActive;
    const displayInTune = showInTune && absCents <= 10;

    let infoText = "—";
    let infoColor: TColor = "textMuted";
    const centsLabel = `${centsInBounds > 0 ? "+" : ""}${centsInBounds}`;

    if (hasReading && isOutOfBounds) {
        infoText = `${displayCents > 0 ? "Tune down" : "Tune up"} · ${absCents} off`;
        infoColor = "danger";
    } else if (hasReading && displayInTune) {
        infoText = `✓ In tune · ${centsLabel}`;
        infoColor = "success";
    } else if (hasReading) {
        infoText = centsLabel;
    }

    /* ******************** Animation ******************** */
    const ringWrapperStyle = useAnimatedStyle(() => ({
        left: `${needlePosition.value * 100}%`,
    }));

    const ringProps = useAnimatedProps(() => ({
        stroke: interpolateColor(
            Math.abs(needlePosition.value - 0.5) * 2,
            [0, 0.3, 1],
            [$color.success, $color.warning, $color.danger]
        ),
    }));

    /* ******************** Effects ******************** */

    useEffect(() => {
        const target = (centsInBounds + 100) / 200;
        const config = isIdle ? TIMEOUT_DRIFT_CENTER_CONFIG : SPRINGINESS_CONFIG;

        needlePosition.value = withSpring(target, config);
    }, [centsInBounds, isIdle]);

    /* ******************** JSX ******************** */
    return (
        <View style={s.container}>
            <View style={s.infoDisplay}>
                <Typography variant="p2" color={infoColor}>{infoText}</Typography>
            </View>

            <View style={s.gaugeContainer}>
                <View style={[s.gaugeTrack, { backgroundColor: $color.border }]}>
                    <View style={[s.gaugeCenterMark, { backgroundColor: $color.borderDark }]} />
                    <Animated.View style={[s.gaugeRingWrapper, ringWrapperStyle]}>
                        <Svg width={40} height={40}>
                            <AnimatedCircle
                                cx={20}
                                cy={20}
                                r={15}
                                strokeWidth={4}
                                animatedProps={ringProps}
                                fill="none"
                            />
                        </Svg>
                    </Animated.View>
                </View>
                <View style={s.gaugeLabels}>
                    <Typography>♭</Typography>
                    <Typography>#</Typography>
                </View>
            </View>
        </View>
    );
}

const s = StyleSheet.create({
    container: {
        gap: 12,
    },
    infoDisplay: {
        alignItems: "center",
        height: 24,
        justifyContent: "center",
    },
    gaugeContainer: {
        gap: 8,
    },
    gaugeTrack: {
        height: 6,
        borderRadius: 3,
        position: "relative",
        overflow: "visible",
    },
    gaugeCenterMark: {
        position: "absolute",
        left: "50%",
        top: -6,
        width: 2,
        height: 18,
        marginLeft: -1,
    },
    gaugeRingWrapper: {
        position: "absolute",
        top: -17,
        width: 40,
        height: 40,
        marginLeft: -20,
    },
    gaugeLabels: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
});
