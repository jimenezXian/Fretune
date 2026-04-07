import { HeaderButton } from "@react-navigation/elements";
import React from "react";
import { Icon, Spinner, TColor, TIconName, Typography } from "../ui";

type IProps = {
  onPress: () => void;
  color?: TColor;
  icon?: TIconName;
  label?: string;
  disabled?: boolean;
  loading?: boolean;
};

const Content = ({ icon, color, label, loading }: Pick<IProps, "icon" | "color" | "label" | "loading">) => {
  if (loading) {
    return <Spinner color={color} />;
  }

  return (
    <>
      {icon && (
        <Icon
          name={icon}
          size={22}
          color={color}
        />
      )}
      {label && <Typography variant="h7">{label}</Typography>}
    </>
  );
};

export function NavigationAction({ onPress, icon, color, label, disabled, loading }: IProps) {
  return (
    <HeaderButton
      onPress={onPress}
      disabled={disabled || loading}
    >
      <Content
        icon={icon}
        color={color}
        label={label}
        loading={loading}
      />
    </HeaderButton>
  );
}
