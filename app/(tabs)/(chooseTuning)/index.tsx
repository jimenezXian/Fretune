import { TuneSet } from "@/components/chooseTuning/TuneSet";
import { useColors } from "@/components/ui";
import { useSelectedInstrument } from "@/store/useTunerStore";
import React from "react";
import { StyleSheet, View } from "react-native";
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
            <View style={s.content}>
                {tunings.map((item) => (
                    <TuneSet key={item.id} name={item.name} tuningId={item.id} style={s.listItem} />
                ))}
            </View>
        </SafeAreaView>
    );
}

const s = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        paddingHorizontal: 24,
    },
    listItem: {
        padding: 24,
    }
})