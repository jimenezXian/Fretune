import React from "react";
import { StyleSheet, View } from "react-native";
import { Typography } from "../ui";

interface ITunerRow {

}

export function TunerRow(props: ITunerRow) {
    /* ******************** Hooks ******************** */
    /* ******************** Variables ******************** */
    /* ******************** Functions ******************** */
    /* ******************** Effects ******************** */
    /* ******************** JSX ******************** */
    return (
        <View style={s.containerWrap}>
            <View style={s.rowContainer}>
                <Typography variant="h3">♭</Typography>
                <Typography variant="h3">#</Typography>
            </View>

        </View>
    );
}
const s = StyleSheet.create({
    containerWrap: {
        padding: 24
    },
    rowContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    }
})