import { useScreenSize } from "@/hooks/useScreenSize";
import React from "react";
import { View } from "react-native";

export function WebGutter({ children, center }: { children: React.ReactNode; center?: boolean }) {
    const screenSize = useScreenSize();

    if (!screenSize.isDesktop) {
        return <>{children}</>;
    }

    const maxWidth = 1080;
    const gutterPadding = Math.max(0, (screenSize.width - maxWidth) / 2);

    return (
        <View
            style={{
                height: "100%",
                paddingLeft: gutterPadding,
                paddingRight: center ? gutterPadding : 0,
            }}
        >
            {children}
        </View>
    );
}
