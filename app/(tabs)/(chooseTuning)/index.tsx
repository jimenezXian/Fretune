import { TuneSet } from "@/components/chooseTuning/TuneSet";
import { useSelectedInstrument } from "@/store/useTunerStore";
import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';



export default function SelectTuningLandingScreen() {
    /* ******************** Hooks ******************** */
    const instrument = useSelectedInstrument();

    /* ******************** Variables ******************** */
    const tunings = instrument.tunings;
    /* ******************** Functions ******************** */
    /* ******************** Effects ******************** */
    /* ******************** JSX ******************** */
    return (
        <SafeAreaView style={s.container}>
            <View style={s.content}>
                {tunings.map((tuning) => (
                    <TuneSet key={tuning.id} tuning={tuning} style={s.listItem} />
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