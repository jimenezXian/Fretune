import { useScreenSize } from "@/hooks/useScreenSize";
import React from "react";
import { View } from "react-native";

interface IWebGutterProps {
    children: React.ReactNode;
    center?: boolean;
}

export function WebGutter({ children, center }: IWebGutterProps) {
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
