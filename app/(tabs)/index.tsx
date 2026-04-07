import * as Sentry from '@sentry/react-native';
import { Button, StyleSheet } from 'react-native';

import React from 'react';

export default function TuneScreen() {
  return (

    <Button title='Try!' onPress={() => { Sentry.captureException(new Error('First error')) }} />
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
