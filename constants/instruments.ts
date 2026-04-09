import { Instrument, Tuning } from "@/types/tuning";

export const BASS_4_TUNINGS: Tuning[] = [
  {
    id: "bass-4-e-standard",
    name: "E Standard",
    strings: [
      { note: "E", frequency: 41.2 },
      { note: "A", frequency: 55.0 },
      { note: "D", frequency: 73.42 },
      { note: "G", frequency: 98.0 },
    ],
  },
  {
    id: "bass-4-drop-d",
    name: "Drop D",
    strings: [
      { note: "D", frequency: 36.71 },
      { note: "A", frequency: 55.0 },
      { note: "D", frequency: 73.42 },
      { note: "G", frequency: 98.0 },
    ],
  },
  {
    id: "bass-4-d-standard",
    name: "D Standard",
    strings: [
      { note: "D", frequency: 36.71 },
      { note: "G", frequency: 49.0 },
      { note: "C", frequency: 65.41 },
      { note: "F", frequency: 87.31 },
    ],
  },
];

export const DEFAULT_INSTRUMENTS: Instrument[] = [
  {
    id: "bass-4",
    name: "4-String Bass",
    icon: "guitar",
    stringCount: 4,
    selectedTuningId: "bass-4-e-standard",
    isCustom: false,
    tunings: BASS_4_TUNINGS,
  },
];
