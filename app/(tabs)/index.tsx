import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/ui/themed-text';
import { Link } from 'expo-router';
import React from 'react';

export default function TuneScreen() {
  return (
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
