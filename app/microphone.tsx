import { Typography } from "@/components/ui";
import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MicrophoneScreen() {
    /* ******************** Hooks ******************** */
    /* ******************** Variables ******************** */
    /* ******************** Functions ******************** */
    /* ******************** Effects ******************** */
    /* ******************** JSX ******************** */
    return (
        <SafeAreaView
            style={s.container}
            edges={["top", "bottom"
            ]}
        >
            <View style={s.content}>
                <View style={{ gap: 8 }}>
                    <Typography variant="h6">Where are you located?</Typography>
                    <Typography
                        color="textMuted"
                        variant="p2"
                    >
                        Need microphone access!
                    </Typography>
                </View>
            </View>
        </SafeAreaView>
    );
}

const s = StyleSheet.create({
    container: {
        flex: 1
    },
    heroImage: {
        width: "100%",
        height: 180,
    },
    content: {
        flexGrow: 1,
        gap: 16,
        padding: 24,
        justifyContent: "center",
        position: "relative",
    },
    result: {
        paddingVertical: 16,
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    resultsContent: {
        flexGrow: 1,
    },
});