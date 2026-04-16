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
                {tunings.map((tuning) => {
                    const isCurrentlySelected = instrument.selectedTuningId == tuning.id;

                    return (
                        <TuneSet key={tuning.id} tuning={tuning} color={isCurrentlySelected ? "primary" : undefined} />
                    )
                }
                )}
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
})