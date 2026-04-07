import * as regular from "@fortawesome/free-regular-svg-icons";
import * as solid from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon, FontAwesomeIconStyle } from "@fortawesome/react-native-fontawesome";
import React from 'react';
import { StyleSheet } from 'react-native';
import { TColor, useColors } from './theme';

const iconMap = {
  guitar: solid.faGuitar ,
  toolbox: solid.faToolbox,
} as const;

export type TIconName = keyof typeof iconMap;

export interface IIconProps {
  name: TIconName;
  color?: TColor | (string & {});
  size?: number;
  style?: FontAwesomeIconStyle;
}

export const Icon = ({
  color,
  size = 20,
  name,
  style,
}: IIconProps) => {
  const { $color } = useColors();
  const icon = iconMap[name] as regular.IconDefinition;
  const themeColor = color && $color[color as TColor];



  return (
    <FontAwesomeIcon
      icon={icon}
      size={size}
      color={themeColor ?? color ?? $color.text}
      style={[s.container, style]}
    />
  )
}

const s = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    outlineWidth: 0,
  },
});
