import { useColors } from "@/components/ui/theme";
import { usePitchDetection } from "@/hooks/usePitchDetection";
import { IStringTuning, ITuning } from "@/types/tuning";
import { centsBetweenFrequencies, frequencyToNote } from "@/utils/noteUtils";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Typography } from "../ui";
import { TuneGauge } from "./TuneGauge";

interface INoteTuner {
    tuning: ITuning;
}

export function NoteTuner({ tuning }: INoteTuner) {
    /* ******************** Hooks ******************** */
    const { frequency } = usePitchDetection();
    const { $color } = useColors();

    const [selectedNote, setSelectedNote] = useState(0);

    /* ******************** Variables ******************** */
    const activeString: IStringTuning = tuning.strings[selectedNote]

    const detectedNote = frequency ? frequencyToNote(frequency) : null;

    const centsFromTarget = detectedNote && activeString
        ? centsBetweenFrequencies(detectedNote.frequency, activeString.frequency)
        : 0;

    const isValidReading = !!detectedNote && Math.abs(centsFromTarget) < 600;
    const rawCents = isValidReading ? Math.round(centsFromTarget) : 0;

    /* ******************** Functions ******************** */
    const handleNotePress = (index: number, stringTuning: IStringTuning) => {
        setSelectedNote(index)
        //TODO: play given frequency
    }

    /* ******************** JSX ******************** */
    return (
        <View style={s.container}>
            <TuneGauge rawCents={rawCents} isActive={!!isValidReading} frequency={frequency} />

            <View style={s.noteGrouping}>
                {tuning.strings.map((string, index) => (
                    <TouchableOpacity
                        onPress={() => handleNotePress(index, string)}
                        key={string.frequency}
                        style={[
                            s.noteContainer,
                            { borderColor: $color.borderDark },
                            activeString?.frequency === string.frequency && { borderColor: $color.info, backgroundColor: $color.borderDark },
                        ]}
                    >
                        <Typography>
                            {string.note}
                            <Typography variant="p4">
                                {string.octave}
                            </Typography>
                        </Typography>
                    </TouchableOpacity>
                ))}
            </View>
        </View >
    );
}

const s = StyleSheet.create({
    container: {
        padding: 24,
        gap: 12,
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
