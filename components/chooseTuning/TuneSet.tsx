import { useSelectedInstrument, useTunerStore } from "@/store/useTunerStore";
import { useRouter } from "expo-router";
import React from "react";
import { StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import { Icon, Typography } from "../ui";


interface ITuneSetProps {
    name: string;
    tuningId: string,
    style?: StyleProp<ViewStyle>
}

export function TuneSet({ name, tuningId, style }: ITuneSetProps) {
    /* ******************** Hooks ******************** */
    const router = useRouter();
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
        <TouchableOpacity onPress={selectTuning} style={[s.container, style]}>
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
        justifyContent: "space-between"
    }
})