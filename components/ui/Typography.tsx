import { StyleProp, Text, TextStyle, type TextProps } from 'react-native';

import React, { createContext, useContext } from 'react';
import { TColor, useColors } from './theme';


export type ITypographyVariant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "h7" | "p1" | "p2" | "p3" | "p4" | "p5";

interface ITypographyProps {
  variant?: ITypographyVariant;
  color?: TColor;
  rawColor?: string;
  lines?: number;
  align?: "left" | "center" | "right";
  adjust?: boolean;
  flex?: number;
  ellipsize?: TextProps["ellipsizeMode"];
  decorationColor?: TextStyle["textDecorationColor"];
  decorationStyle?: TextStyle["textDecorationStyle"];
  decorationLine?: TextStyle["textDecorationLine"];
  style?: StyleProp<TextStyle>;
}

const FONT_SIZE_MAP: Record<ITypographyVariant, number> = {
  h1: 48,
  h2: 40,
  h3: 36,
  h4: 32,
  h5: 24,
  h6: 20,
  h7: 16,
  p1: 16,
  p2: 14,
  p3: 12,
  p4: 10,
  p5: 8,
};

const FONT_FAMILY_MAP: Record<ITypographyVariant, TextStyle["fontWeight"]> = {
  h1: "600",
  h2: "600",
  h3: "600",
  h4: "600",
  h5: "600",
  h6: "600",
  h7: "600",
  p1: "regular",
  p2: "regular",
  p3: "regular",
  p4: "regular",
  p5: "regular",
};

type ITypographyContext = {
  style: StyleProp<TextStyle>;
};

const TypographyContext = createContext<ITypographyContext | undefined>(undefined);
export const useTypography = () => {
  const context = useContext(TypographyContext);
  if (!context) {
    throw new Error("useTypography must be used within a TypographyProvider");
  }
  return context;
};

export const Typography = ({
  variant = "p1",
  color = "text",
  align = "left",
  ...props
}: React.PropsWithChildren<ITypographyProps>) => {
  const { $color } = useColors();

  const contextStyles: StyleProp<TextStyle> = {
    fontSize: FONT_SIZE_MAP[variant],
  };

  const composedStyles: StyleProp<TextStyle> = [
    contextStyles,
    {
      fontWeight: FONT_FAMILY_MAP[variant],
      color: props.rawColor ?? $color[color],
      textAlign: align,
      flex: props.flex,
      textDecorationStyle: props.decorationStyle,
      textDecorationColor: props.decorationColor,
      textDecorationLine: props.decorationLine,
    },
    props.style,
  ];

  return (
    <TypographyContext.Provider value={{ style: contextStyles }}>
      <Text
        numberOfLines={props.lines}
        adjustsFontSizeToFit={props.adjust}
        ellipsizeMode={props.ellipsize}
        style={composedStyles}
      >
        {props.children}
      </Text>
    </TypographyContext.Provider>
  );
};
