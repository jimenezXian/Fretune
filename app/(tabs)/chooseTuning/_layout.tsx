import { NavigationBackButton } from '@/components/navigation/NavigationBackButton';
import { Stack } from 'expo-router';
import React from 'react';

export default function chooseTuningLayout() {
  return (
     <Stack
      screenOptions={{
        headerTitleAlign: "center",
        headerShadowVisible: false,
      }}
    >
     <Stack.Screen
     name="index"
     options={{
        title: "Select Tuning",
        headerLeft: NavigationBackButton,
        headerTitleAlign: "center",
     }}
     />
    <Stack.Screen
    name="guitarTuning"
    options={{
        title: "Guitar Tuning",
        headerLeft: NavigationBackButton,
        headerTitleAlign: "center",
    }}   
    />
    <Stack.Screen
    name="bassTuning"
     options={{
        title: "Bass Tuning",
        headerLeft: NavigationBackButton,
        headerTitleAlign: "center",
    }}   
    />
    </Stack>
  );
}
