import { IInstrument, ITuning } from "@/types/tuning";

export const BASS_4_TUNINGS: ITuning[] = [
  {
    id: "bass-4-e-standard",
    name: "E Standard",
    strings: [
      { note: "E", octave: 1, frequency: 41.2 },
      { note: "A", octave: 1, frequency: 55.0 },
      { note: "D", octave: 2, frequency: 73.42 },
      { note: "G", octave: 2, frequency: 98.0 },
    ],
  },
  {
    id: "bass-4-drop-d",
    name: "Drop D",
    strings: [
      { note: "D", octave: 1, frequency: 36.71 },
      { note: "A", octave: 1, frequency: 55.0 },
      { note: "D", octave: 2, frequency: 73.42 },
      { note: "G", octave: 2, frequency: 98.0 },
    ],
  },
  {
    id: "bass-4-d-standard",
    name: "D Standard",
    strings: [
      { note: "D", octave: 1, frequency: 36.71 },
      { note: "G", octave: 1, frequency: 49.0 },
      { note: "C", octave: 2, frequency: 65.41 },
      { note: "F", octave: 2, frequency: 87.31 },
    ],
  },
];

export const DEFAULT_INSTRUMENTS: IInstrument[] = [
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
