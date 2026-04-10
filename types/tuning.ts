export type TNote = "C" | "C#" | "D" | "D#" | "E" | "F" | "F#" | "G" | "G#" | "A" | "A#" | "B";

export interface IStringTuning {
  note: TNote;
  octave: number;
  frequency: number;
};

export interface ITuning {
  id: string;
  name: string;
  strings: IStringTuning[];
};

export interface IInstrument {
  id: string;
  name: string;
  icon?: string;
  stringCount: number;
  tunings: ITuning[];
  selectedTuningId: string;
  isCustom: boolean;
};
