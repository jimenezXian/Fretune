import { TuneSet } from "@/components/chooseTuning/TuneSet";
import { useColors } from "@/components/ui";
import { useSelectedInstrument } from "@/store/useTunerStore";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';



export default function SelectTuningLandingScreen() {
    /* ******************** Hooks ******************** */
    const instrument = useSelectedInstrument();
    const { $color } = useColors();

    /* ******************** Variables ******************** */
    const tunings = instrument.tunings;
    /* ******************** Functions ******************** */
    /* ******************** Effects ******************** */
    /* ******************** JSX ******************** */
    return (
        <SafeAreaView style={s.container}>
            {tunings.map((item) => (
                <TuneSet key={item.id} name={item.name} tuningId={item.id} style={[s.listItem, { borderColor: $color.borderLight }]} />
            ))}
        </SafeAreaView>
    );
}

const s = StyleSheet.create({
    container: {
        flex: 1,
    },

    listItem: {
        padding: 24,
        borderTopWidth: 2,
    }
})