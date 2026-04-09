
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

const lightTheme: TColorMap = {
  bg: "#ffffff",
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

export type TColor = keyof TColorMap;

export function useColors() {
  return {
    $color: lightTheme,
  };
}
