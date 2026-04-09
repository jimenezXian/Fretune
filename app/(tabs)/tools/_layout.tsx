import { NavigationBackButton } from "@/components/navigation/NavigationBackButton";
import { useColors } from "@/components/ui";
import { Stack } from "expo-router";
import React from "react";

export default function ToolsLayout() {
    /* ******************** Hooks ******************** */
    const { $color } = useColors();
    /* ******************** Variables ******************** */
    /* ******************** Functions ******************** */
    /* ******************** Effects ******************** */
    /* ******************** JSX ******************** */
    return (
        <Stack
            screenOptions={{
                headerTitleAlign: "center",
                headerShadowVisible: false,
                contentStyle: { backgroundColor: $color.bg },

            }}
        >
            <Stack.Screen
                name="index"
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="chromaticTuner"
                options={{
                    title: "Chromatic Tuner",
                    headerLeft: NavigationBackButton,
                    headerTitleAlign: "center",
                }}
            />
        </Stack>
    );
}