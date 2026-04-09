import { TuneSet } from "@/components/tuning/TuneSet";
import { useSelectedInstrument } from "@/store/useTunerStore";
import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

interface ISelectTuningLandingScreen {

}

export default function SelectTuningLandingScreen(props: ISelectTuningLandingScreen) {
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
                {tunings.map((item, index) => (
                    <TuneSet key={index} name={item.name} tuningId={item.id} />
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
        padding: 24,

    },
})