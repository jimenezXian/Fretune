import { Icon, Typography, useColors } from "@/components/ui";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function ToolsScreen() {
    /* ******************** Hooks ******************** */
    const { $color } = useColors();
    /* ******************** Variables ******************** */
    /* ******************** Functions ******************** */
    /* ******************** Effects ******************** */
    /* ******************** JSX ******************** */
    return (
        <SafeAreaView
            style={s.container}
            edges={["top", "bottom"]}>
            <View style={s.titleContainer}>
                <Typography variant="h4" >Tools</Typography>
            </View>
            <View style={s.content}>
                <TouchableOpacity onPress={() => router.navigate("/tools/chromaticTuner")} style={[s.listItem, { borderColor: $color.border }]}>
                    <Typography variant='p1'>
                        Chromatic Tuner
                    </Typography>
                    <Icon name="chevron-right" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.navigate("/tools/manageInstruments")} style={[s.listItem, { borderColor: $color.border }]}>
                    <Typography variant='p1'>
                        Manage Instruments
                    </Typography>
                    <Icon name="chevron-right" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const s = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleContainer: {
        flexDirection: 'column',
        gap: 12,
        padding: 24
    },
    content: {
        paddingHorizontal: 24,
    },
    listItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderTopWidth: 0.5,
        padding: 20
    }
});
