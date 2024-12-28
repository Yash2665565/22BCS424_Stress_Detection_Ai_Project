import { create } from 'zustand';
import type { StressLevel } from '../types';

interface StressStore {
  currentStress: StressLevel | null;
  history: StressLevel[];
  setCurrentStress: (stress: StressLevel) => void;
  addToHistory: (stress: StressLevel) => void;
}

export const useStressStore = create<StressStore>((set) => ({
  currentStress: null,
  history: [],
  setCurrentStress: (stress) => set({ currentStress: stress }),
  addToHistory: (stress) =>
    set((state) => ({ history: [...state.history, stress] })),
}));
