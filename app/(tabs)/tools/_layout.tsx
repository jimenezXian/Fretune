import { NavigationBackButton } from "@/components/navigation/NavigationBackButton";
import { WebGutter } from "@/components/ui/WebGutter";
import { useScreenSize } from "@/hooks/useScreenSize";
import { Stack } from "expo-router";
import React from "react";


const ToolsStackContent = (
    <Stack
        screenOptions={{
            headerTitleAlign: "center",
            headerShadowVisible: false,
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
        <Stack.Screen
            name="manageInstruments"
            options={{
                title: "Manage Instruments",
                headerLeft: NavigationBackButton,
                headerTitleAlign: "center",
            }}
        />
    </Stack>
);

export default function ToolsLayout() {
    /* ******************** Hooks ******************** */
    const screenSize = useScreenSize();
    /* ******************** Variables ******************** */
    /* ******************** Functions ******************** */
    /* ******************** Effects ******************** */
    /* ******************** JSX ******************** */
    if (screenSize.isDesktop) {
        return <WebGutter center> {ToolsStackContent}</WebGutter>
    }

    return ToolsStackContent;
}