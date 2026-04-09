export type Note = "C" | "C#" | "D" | "D#" | "E" | "F" | "F#" | "G" | "G#" | "A" | "A#" | "B";

export type StringTuning = {
  note: Note;
  frequency: number;
};

export type Tuning = {
  id: string;
  name: string;
  strings: StringTuning[];
};

export type Instrument = {
  id: string;
  name: string;
  icon?: string;
  stringCount: number;
  tunings: Tuning[];
  selectedTuningId: string;
  isCustom: boolean;
};
