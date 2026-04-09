import { Instrument } from '@/components/Instrument';
import { NoteTuner } from '@/components/tuning';
import { Typography } from '@/components/ui';
import { useSelectedInstrument, useSelectedTuning } from '@/store/useTunerStore';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TuneScreen() {
  const instrument = useSelectedInstrument();
  const tuning = useSelectedTuning();

  return (
    <SafeAreaView
      style={s.container}
      edges={["top", "bottom"]}>
      <View style={s.titleContainer}>
        <Typography variant='h4'>
          Fretune
        </Typography>
        <Instrument name={instrument.name} tuning={tuning.name} />
      </View>
      <NoteTuner tuning={tuning} />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'column',
    gap: 12,
    padding: 24
  },
  // content: {
  //   flexGrow: 1,
  //   gap: 16,
  //   padding: 24, 
  //   justifyContent: "center",
  //   position: "relative"
  // },
});
