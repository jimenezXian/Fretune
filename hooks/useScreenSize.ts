import { useWindowDimensions } from "react-native";

export type TScreenSize = "mobile" | "tablet" | "desktop";

interface IScreenSizeResult {
  size: TScreenSize;
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

export function useScreenSize(): IScreenSizeResult {
  const { width, height } = useWindowDimensions();

  const size: TScreenSize =
    width < 768 ? "mobile" : width < 1024 ? "tablet" : "desktop";

  return {
    size,
    width,
    height,
    isMobile: size === "mobile",
    isTablet: size === "tablet",
    isDesktop: size === "desktop",
  };
}
