import { useSelectedInstrument, useTunerStore } from "@/store/useTunerStore";
import { ITuning } from "@/types/tuning";
import { useRouter } from "expo-router";
import React from "react";
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import { Icon, Typography, useColors } from "../ui";


interface ITuneSetProps {
    tuning: ITuning;
    style?: StyleProp<ViewStyle>;
}

export function TuneSet({ tuning, style }: ITuneSetProps) {
    /* ******************** Hooks ******************** */
    const router = useRouter();
    const { $color } = useColors();
    const instrument = useSelectedInstrument();

    const setTuning = useTunerStore((state) => state.setTuning);

    /* ******************** Variables ******************** */
    const noteSet = tuning.strings.map((string) => string.note).join(" ");

    /* ******************** Functions ******************** */
    const selectTuning = () => {
        setTuning(instrument.id, tuning.id);
        router.back();
    }

    /* ******************** JSX ******************** */
    return (
        <TouchableOpacity onPress={selectTuning} style={[s.container, { borderColor: $color.border }, style]}>
            <View style={s.setLabel}>
                <Typography variant="p1">
                    {tuning.name}
                </Typography>
                <Typography variant="p3" color="textMuted">
                    {noteSet}
                </Typography>
            </View>
            <Icon name="chevron-right" />
        </TouchableOpacity>
    );
}

const s = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderTopWidth: 0.5,
        padding: 20,
    },
    setLabel: {
        flexDirection: "column",
        gap: 4,
    },
})