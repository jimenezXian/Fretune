import { DEFAULT_INSTRUMENTS } from "@/constants/instruments";
import { IInstrument, ITuning } from "@/types/tuning";
import { createMMKV } from "react-native-mmkv";
import { create } from "zustand";
import { createJSONStorage, persist, StateStorage } from "zustand/middleware";

export const storage = createMMKV();

const mmkvStorage: StateStorage = {
  getItem: (name) => storage.getString(name) ?? null,
  setItem: (name, value) => storage.set(name, value),
  removeItem: (name) => storage.remove(name),
};

export type TTunerStore = {
  selectedInstrumentId: string;
  instruments: IInstrument[];

  selectInstrument: (id: string) => void;
  setTuning: (instrumentId: string, tuningId: string) => void;
};


export const useTunerStore = create<TTunerStore>()(
  persist(
    (set) => ({
      selectedInstrumentId: "bass",
      instruments: DEFAULT_INSTRUMENTS,

      selectInstrument: (id) => set({ selectedInstrumentId: id }),

      setTuning: (instrumentId, tuningId) =>
        set((state) => ({
          instruments: state.instruments.map((inst) =>
            inst.id === instrumentId
              ? { ...inst, selectedTuningId: tuningId }
              : inst
          ),
        }
        )),
    }),
    {
      name: "tuner-store",
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);

export const useSelectedInstrument = (): IInstrument =>
  useTunerStore((s) =>
    s.instruments.find((i) => i.id === s.selectedInstrumentId) ?? s.instruments[0]
  );

export const useSelectedTuning = (): ITuning => {
  const instrument = useSelectedInstrument();
  return (
    instrument.tunings.find((t) => t.id === instrument.selectedTuningId) ??
    instrument.tunings[0]
  );
};
