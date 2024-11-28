import { create } from 'zustand';

export const useMicroStatus = create<{
  isUsingMicro: boolean;
  setMicroStatus: (status: boolean) => void;
}>((set, get) => ({
  isUsingMicro: false,

  setMicroStatus: (status: boolean) => set({ isUsingMicro: status }),

  getMicroStatus: () => get().isUsingMicro,
}));
