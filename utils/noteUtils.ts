import { TNote } from "@/types/tuning";

const NOTE_NAMES: TNote[] = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const A4_FREQUENCY = 440;
const A4_MIDI = 69;

interface IDetectedNote {
  note: TNote;
  octave: number;
  cents: number;
  frequency: number;
};

/**
 * Given that the general music theory equation from frequency to MIDI:
 * n = 69 + 12 x Log2(frequency /440)
 * Utilizes this to derive the midi
 * 
 * Key notes to distinguish we round down to gain cents which are just a measurement between two adjacent notes.
 * Given that one octave is 12 semitones, in midi we transition to next note per 12 semitones...
 *
 * Midi begins at -1 index for octaves : )
 * Sourced: https://www.phys.unsw.edu.au/jw/notes.html
 * @param frequency 
 * @returns the detected note with cents and the raw frequency 
 */
export function frequencyToNote(frequency: number): IDetectedNote {
  const midiFloat =  A4_MIDI + 12 * Math.log2(frequency / A4_FREQUENCY);
  const midiRounded = Math.round(midiFloat);

  const cents = Math.round((midiFloat - midiRounded) * 100);

  const noteIndex = midiRounded % 12;
  const octave = Math.floor(midiRounded / 12) - 1;

  return {
    note: NOTE_NAMES[noteIndex],
    octave,
    cents,
    frequency,
  };
}
