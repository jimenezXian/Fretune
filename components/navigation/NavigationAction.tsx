import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { Icon, Spinner, TColor, TIconName, Typography } from "../ui";

interface IProps {
  onPress: () => void;
  color?: TColor;
  icon?: TIconName;
  label?: string;
  disabled?: boolean;
  loading?: boolean;
}

const Content = ({
  icon,
  color,
  label,
  loading,
}: Pick<IProps, "icon" | "color" | "label" | "loading">) => {
  if (loading) {
    return <Spinner color={color} />;
  }

  return (
    <>
      {icon && <Icon name={icon} size={22} color={color} />}
      {label && <Typography variant="h7">{label}</Typography>}
    </>
  );
};

export function NavigationAction({
  onPress,
  icon,
  color,
  label,
  disabled,
  loading,
}: IProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      hitSlop={12}
      style={s.button}
    >
      <Content icon={icon} color={color} label={label} loading={loading} />
    </Pressable>
  );
}

const s = StyleSheet.create({
  button: {
    padding: 8,
  },
});
