import { bassGuitarImage } from '@/assets/images';
import { Instrument } from '@/components/Instrument';
import { NoteTuner } from '@/components/tuning';
import { Typography } from '@/components/ui';
import { useScreenSize } from '@/hooks/useScreenSize';
import { useSelectedInstrument, useSelectedTuning } from '@/store/useTunerStore';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TuneScreen() {
  const instrument = useSelectedInstrument();
  const tuning = useSelectedTuning();

  const { width, height } = useScreenSize();

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
      <Image source={bassGuitarImage}
        style={[s.bassImage,
        { width: width * 0.6, height: height * 0.6 }]}
      />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
  },
  titleContainer: {
    flexDirection: 'column',
    gap: 12,
    padding: 24
  },
  bassImage: {
    zIndex: -1,
    position: "absolute",
    width: "75%",
    height: "75%",
    alignSelf: "center",
    resizeMode: "contain",
    bottom: -50,
  }
});
