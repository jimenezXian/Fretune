import React from "react";
import { ActivityIndicator } from "react-native";
import { TColor, TSize, useColors } from "./theme";

interface ISpinnerProps {
    size?: TSize | number;
    color?: TColor | `#${string}`;
}

const ActivityIndicatorSizes: Record<TSize, number> = {
  sm: 20,
  md: 30,
  lg: 40,
};

export const Spinner = ({ size = "md", color = "primary"}: ISpinnerProps) => {
  const { $color } = useColors();
  const sizeValue = typeof size === "number" ? size : ActivityIndicatorSizes[size];
  const colorValue = $color[color as TColor] || color;

    return (
        <ActivityIndicator
        size={sizeValue}
        color={colorValue}
        />
    )
}