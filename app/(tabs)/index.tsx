import { StyleSheet, View } from 'react-native';

import { Instrument } from '@/components/Instrument';
import { TunerRow } from '@/components/tuning/TunerRow';
import { Typography } from '@/components/ui';
import { useSelectedInstrument, useSelectedTuning } from '@/store/useTunerStore';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TuneScreen() {
  const instrument = useSelectedInstrument();
  const tuning = useSelectedTuning();

  return (


    <SafeAreaView
      style={s.container}
      edges={["top", "bottom"]}>
      {/* <View style={s.content}> */}

      <View style={s.titleContainer}>
        <Typography variant='h4'> {"Fretune"}</Typography>
        <Instrument name={instrument.name} tuning={tuning.name} />
      </View>
      <TunerRow />
      {/* </View> */}

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
