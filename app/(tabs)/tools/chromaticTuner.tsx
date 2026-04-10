import { TuneGauge } from "@/components/tuning";
import { Typography } from "@/components/ui";
import { usePitchDetection } from "@/hooks/usePitchDetection";
import { frequencyToNote } from "@/utils/noteUtils";
import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChromaticTunerScreen() {
  /* ******************** Hooks ******************** */
  const { frequency } = usePitchDetection();

  /* ******************** Variables ******************** */
  const detectedNote = frequency ? frequencyToNote(frequency) : null;
  const cents = detectedNote?.cents ?? 0;

  /* ******************** JSX ******************** */
  return (
    <SafeAreaView style={s.container}>
      <View style={s.noteContainer}>
        <Typography variant="h1" color={detectedNote ? undefined : "textMuted"}>
          {detectedNote ? detectedNote.note : ""}
          <Typography variant="p1" color="textMuted">
            {detectedNote ? `${detectedNote.octave}` : ""}
          </Typography>
        </Typography>

      </View>

      <View style={s.gaugeWrapper}>
        <TuneGauge rawCents={cents} isActive={!!detectedNote} frequency={frequency} smoothing={0.07} />
      </View>

      <View style={s.frequencyContainer}>
        <Typography variant="p2" color="textMuted">
          {detectedNote ? `${detectedNote.frequency.toFixed(1)} Hz` : "Listening..."}
        </Typography>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  noteContainer: {
    alignItems: "center",
    marginBottom: 48,
  },
  gaugeWrapper: {
    width: "100%",
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  frequencyContainer: {
    alignItems: "center",
  },
});
