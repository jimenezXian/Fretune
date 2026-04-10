import { useColors } from "@/components/ui/theme";
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
}

const SPRINGINESS_CONFIG = { damping: 15, stiffness: 120 };
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export function TuneGauge({ rawCents, isActive, frequency, smoothing = 0.15 }: ITuneGauge) {
    /* ******************** Hooks ******************** */
    const { $color } = useColors();
    const displayCents = useSmoothedCents(rawCents, isActive ? frequency : null, smoothing);
    const needlePosition = useSharedValue(0);

    /* ******************** Variables ******************** */
    const centsInBounds = Math.max(-100, Math.min(100, displayCents));
    const isOutOfBounds = Math.abs(displayCents) > 100;

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
        needlePosition.value = withSpring((centsInBounds + 100) / 200, SPRINGINESS_CONFIG);
    }, [centsInBounds]);

    /* ******************** JSX ******************** */
    return (
        <View style={s.container}>
            <View style={s.infoDisplay}>
                <View style={s.tuneDirectionLabel}>
                    {isOutOfBounds && isActive && (
                        <Typography variant="p2" color="danger">
                            {displayCents > 0 ? "Tune down" : "Tune up"}
                        </Typography>
                    )}
                </View>

                <Typography variant="p2" color="textMuted">
                    {isActive ? `${centsInBounds > 0 ? "+" : ""}${centsInBounds}` : ""}
                </Typography>
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
        gap: 4,
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
    tuneDirectionLabel: {
        alignItems: "center",
        height: 24,
        marginBottom: 8,
    },
});
