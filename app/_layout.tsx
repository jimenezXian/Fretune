// import { useMicrophonePermission } from '@/hooks/useMicrophonePermission';
import { useColors } from '@/components/ui';
import { LogService } from '@/services/LogService';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import 'react-native-reanimated';

LogService.init();


export const unstable_settings = {
  anchor: '(tabs)',
};

function RootLayout() {
  // const { granted: microphonePermitted, request } = useMicrophonePermission();

  const { $color } = useColors();

  return (
    // <ThemeProvider value={DefaultTheme}>
    <>
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: $color.bg }
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="light" />
    </>
    // </ThemeProvider >
  );
};

export default LogService.wrapRoot(RootLayout);
