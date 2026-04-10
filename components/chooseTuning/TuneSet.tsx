import { useSelectedInstrument, useTunerStore } from "@/store/useTunerStore";
import { useRouter } from "expo-router";
import React from "react";
import { StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import { Icon, Typography, useColors } from "../ui";


interface ITuneSetProps {
    name: string;
    tuningId: string,
    style?: StyleProp<ViewStyle>
}

export function TuneSet({ name, tuningId, style }: ITuneSetProps) {
    /* ******************** Hooks ******************** */
    const router = useRouter();
    const { $color } = useColors();
    const instrument = useSelectedInstrument();

    const setTuning = useTunerStore((state) => state.setTuning);

    /* ******************** Variables ******************** */
    /* ******************** Functions ******************** */
    const selectTuning = () => {
        setTuning(instrument.id, tuningId)
        router.back();
    }

    /* ******************** Effects ******************** */
    /* ******************** JSX ******************** */
    return (
        <TouchableOpacity onPress={selectTuning} style={[s.container, { borderColor: $color.border }, style]}>
            <Typography variant="p1">
                {name}
            </Typography>
            <Icon name="chevron-right" />
        </TouchableOpacity >
    );
}

const s = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderTopWidth: 0.5,
        padding: 20
    }
})