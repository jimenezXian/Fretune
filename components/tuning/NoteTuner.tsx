import { useColors } from "@/components/ui/theme";
import { usePitchDetection } from "@/hooks/usePitchDetection";
import { IStringTuning, ITuning } from "@/types/tuning";
import { frequencyToNote } from "@/utils/noteUtils";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, {
    interpolateColor,
    useAnimatedProps,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";
import { Typography } from "../ui";

interface INoteTuner {
    tuning: ITuning;
}

const SPRINGINESS_CONFIG = { damping: 15, stiffness: 120 };

export function NoteTuner({ tuning }: INoteTuner) {
    /* ******************** Hooks ******************** */
    const { frequency } = usePitchDetection();
    const { $color } = useColors();

    const [selectedNote, setSelectedNote] = useState(0);

    const needlePosition = useSharedValue(0);
    /* ******************** Variables ******************** */
    const activeString: IStringTuning = tuning.strings[selectedNote]

    const detectedFrequency = frequency ? frequencyToNote(frequency) : null;

    const rawCents = detectedFrequency && activeString
        ? Math.round(1200 * Math.log2(detectedFrequency.frequency / activeString.frequency))
        : 0;

    const centsInBounds = Math.max(-100, Math.min(100, rawCents));
    const isOutOfBounds = Math.abs(rawCents) > 100;


    /* ******************** Functions ******************** */
    /* ******************** Animation ******************** */
    const ringWrapperStyle = useAnimatedStyle(() => ({
        left: `${needlePosition.value * 100}%`,
    }));

    const AnimatedCircle = Animated.createAnimatedComponent(Circle);

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
                    {isOutOfBounds && detectedFrequency && (
                        <Typography variant="p2" color="danger">
                            {rawCents > 0 ? "Tune down" : "Tune up"}
                        </Typography>
                    )}
                </View>

                <Typography variant="p2" color="textMuted">
                    {detectedFrequency ? `${centsInBounds > 0 ? "+" : ""}${centsInBounds}` : ""}
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

            <View style={s.noteGrouping}>
                {tuning.strings.map((string, index) => (
                    <TouchableOpacity
                        onPress={() => setSelectedNote(index)}
                        key={string.frequency}
                        style={[
                            s.noteContainer,
                            { borderColor: $color.borderDark },
                            activeString?.frequency === string.frequency && { borderColor: $color.info, backgroundColor: $color.borderDark },
                        ]}
                    >
                        <Typography>
                            {string.note}
                        </Typography>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

const s = StyleSheet.create({
    container: {
        padding: 24,
        gap: 12,
    },
    infoDisplay: {
        alignItems: "center",
        gap: 4,
    },
    noteText: {
        fontSize: 64,
        fontWeight: "600",
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
    noteGrouping: {
        flexDirection: "column",
        gap: 8,
    },
    noteContainer: {
        alignItems: "center",
        justifyContent: "center",
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 1,
    },
});
