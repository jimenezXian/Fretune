import { NavigationBackButton } from "@/components/navigation/NavigationBackButton";
import { WebGutter } from "@/components/ui/WebGutter";
import { useScreenSize } from "@/hooks/useScreenSize";
import { Stack } from "expo-router";
import React from "react";

const TuneStackContent = (
    <Stack
        screenOptions={{
            headerTitleAlign: "center",
            headerShadowVisible: false,
        }}
    >
        <Stack.Screen
            name="index"
            options={{
                headerShown: false,
            }}
        />
        <Stack.Screen
            name="chooseTuning"
            options={{
                title: "Select Tuning",
                headerLeft: NavigationBackButton,
                headerTitleAlign: "center",
            }}
        />
    </Stack>
);

export default function TuneLayout() {
    /* ******************** Hooks ******************** */
    const screenSize = useScreenSize();
    /* ******************** JSX ******************** */
    if (screenSize.isDesktop) {
        return <WebGutter center>{TuneStackContent}</WebGutter>
    }

    return TuneStackContent;
}
