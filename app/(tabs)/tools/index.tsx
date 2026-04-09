import { Icon, Typography } from "@/components/ui";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function ToolsScreen() {
    /* ******************** Hooks ******************** */
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
                <TouchableOpacity onPress={() => router.navigate("/(tabs)/tools/chromaticTuner")} style={s.listItem}>
                    <Typography variant='p1'>
                        Chromatic Tuner
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
        backgroundColor: "white"
    }, titleContainer: {
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
        borderColor: "#e5e5e5",
        borderWidth: 0.5,
        padding: 20
    }
});
