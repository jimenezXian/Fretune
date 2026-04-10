import { NavigationBackButton } from '@/components/navigation/NavigationBackButton';
import { useColors } from '@/components/ui';
import { Stack } from 'expo-router';
import React from 'react';

export default function chooseTuningLayout() {
  const { $color } = useColors();

  return (
    <Stack
      screenOptions={{
        headerTitleAlign: "center",
        headerShadowVisible: false,
        contentStyle: { backgroundColor: $color.bg }
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
    </Stack>
  );
}
