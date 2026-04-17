import { LogService } from "@/services/LogService";
import { useNavigation } from "@react-navigation/native";
import { NativeStackHeaderBackProps } from "@react-navigation/native-stack";
import React from "react";
import { NavigationAction } from "./NavigationAction";

type INavigationBackButtonProps = NativeStackHeaderBackProps & {
  onPress?: () => void;
};

export function NavigationBackButton(props: INavigationBackButtonProps) {
  /* ******************** Hooks ******************** */
  const navigation = useNavigation();

  /* ******************** Variables ******************** */
  const handlePress = () => {
    if (props.onPress) {
      props.onPress();
      return;
    }
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
    else {
      LogService.error({
        action: "NavigationBackButton.handlePress",
        error: new Error("CantGoBack"),
      });
    }
  };

  /* ******************** Functions ******************** */
  /* ******************** Effects ******************** */
  /* ******************** JSX ******************** */
  return (
    <NavigationAction
      onPress={handlePress}
      icon="chevron-left"
    />
  );
}