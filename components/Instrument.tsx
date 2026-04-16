import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Icon, Typography } from "./ui";

interface IInstrumentProps {
    name: string;
    tuning: string;
}

export function Instrument({ name, tuning }: IInstrumentProps) {
    /* ******************** Hooks ******************** */
    const router = useRouter();
    /* ******************** Variables ******************** */
    /* ******************** Functions ******************** */
    /* ******************** Effects ******************** */
    /* ******************** JSX ******************** */
    return (
        <TouchableOpacity onPress={() => router.navigate("/tune/chooseTuning")}>
            <View style={s.content}>
                <View style={s.instrumentWrap}>
                    <Typography>
                        {name}
                    </Typography>
                    <Typography variant="p2">
                        {tuning}
                    </Typography>
                </View>
                <Icon name="chevron-right" />

            </View>
        </TouchableOpacity>
    );
}

const s = StyleSheet.create({
    content: {
        flexDirection: "row",
        alignItems: "center",
        columnGap: 12

    },
    instrumentWrap: {
        flexDirection: "column",
    }
})