import { NavigationBackButton } from "@/components/navigation/NavigationBackButton";
import { Stack } from "expo-router";
import React from "react";

export default function ToolsLayout() {
    /* ******************** Hooks ******************** */
    /* ******************** Variables ******************** */
    /* ******************** Functions ******************** */
    /* ******************** Effects ******************** */
    /* ******************** JSX ******************** */
    return (
        <Stack
            screenOptions={{
                headerTitleAlign: "center",
                headerShadowVisible: false,
            }}
        >
            <Stack.Screen
                name="index"
                options={{
                    title: "Tools",
                    headerLeft: NavigationBackButton,
                    headerTitleAlign: "center",
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