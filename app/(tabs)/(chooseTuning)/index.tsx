import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

interface ISelectTuningLandingScreen {

}

export default function SelectTuningLandingScreen(props: ISelectTuningLandingScreen) {
    /* ******************** Hooks ******************** */
    // const { instrument  } = useInstrument();
    /* ******************** Variables ******************** */
    /* ******************** Functions ******************** */
    /* ******************** Effects ******************** */
    /* ******************** JSX ******************** */
    return (
        <SafeAreaView style={s.container}>
            <View style={s.content}>

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