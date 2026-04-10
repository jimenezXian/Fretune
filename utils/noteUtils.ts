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
 * Cents between two frequencies. Given that one octave is 12 semitones -> 1200
 * 1200 * log2(f1/f2) distance in cents.
 * Sourced: https://www.phys.unsw.edu.au/jw/notes.html
 */
export function centsBetweenFrequencies(frequency: number, targetFrequency: number): number {
  return 1200 * Math.log2(frequency / targetFrequency);
}

/**
 * Exponential moving average step. 
 * Blends `next` into `previous` weighted by
 * `alpha` (0–1). Lower alpha = smoother/laggier, higher alpha = more responsive.
 * https://en.wikipedi7a.org/wiki/Exponential_smoothing
 */
export function smoothEMA(previous: number, next: number, alpha: number): number {
  return previous * (1 - alpha) + next * alpha;
}


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
  const midiFloat = A4_MIDI + 12 * Math.log2(frequency / A4_FREQUENCY);
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