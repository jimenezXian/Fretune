import { LogService } from "@/services/LogService";
import { NativeStackHeaderLeftProps } from "@react-navigation/native-stack";
import { useRouter } from "expo-router";
import React from "react";
import { NavigationAction } from "./NavigationAction";

type INavigationBackButtonProps = NativeStackHeaderLeftProps & {
  onPress?: () => void;
};

export function NavigationBackButton(props: INavigationBackButtonProps) {
  /* ******************** Hooks ******************** */
  const router = useRouter();

  /* ******************** Variables ******************** */
  const handlePress = () => {
    if (props.onPress) {
      props.onPress();
      return;
    }
    if (router.canGoBack()) {
      router.back();
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
      icon="guitar"
    />
  );
}