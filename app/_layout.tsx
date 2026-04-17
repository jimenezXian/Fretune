import { useColors } from '@/components/ui';
import { LogService } from '@/services/LogService';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

LogService.init();

function RootLayout() {
  const { $color } = useColors();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: $color.bg,
          border: $color.border,
          primary: $color.primary,
          card: $color.bg,
          notification: $color.danger,
          text: $color.text,
        },
      }}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="dark" />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
};

export default LogService.wrapRoot(RootLayout);
