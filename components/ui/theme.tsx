import { ViewStyle } from "react-native";

interface TColorMap {
  bg: `#${string}`;
  textInverted: `#${string}`;
  text: `#${string}`;
  textMuted: `#${string}`;
  borderDark: `#${string}`;
  border: `#${string}`;
  borderLight: `#${string}`;
  primary: `#${string}`;
  secondary: `#${string}`;
  success: `#${string}`;
  warning: `#${string}`;
  danger: `#${string}`;
  info: `#${string}`;
}

export type TColorVariant = "primary" | "secondary" | "success" | "warning" | "danger" | "info";
export type TColor = keyof TColorMap;
export type TSize = "sm" | "md" | "lg";

const lightTheme: TColorMap = {
  bg: "#fafafa",
  textInverted: "#f2f2f2",
  text: "#0b0b0b",
  textMuted: "#6c757d",
  borderDark: "#cfdde1",
  border: "#e5e5e5",
  borderLight: "#f0f4f6",
  primary: "#1e9df1",
  secondary: "#0a0a0a",
  success: "#00b87a",
  warning: "#f7b928",
  danger: "#f4212e",
  info: "#1da1f2",
};

export function useColors() {
  return {
    $color: lightTheme,
  };
}

export const $radius = 8;

export const $shadow: Record<TSize, ViewStyle> = {
  sm: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,

    elevation: 6,
  },
};
