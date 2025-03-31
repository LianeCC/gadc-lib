'use client';

import { create } from 'zustand';
import { OnboardingSessionState, OnboardingSessionStatus } from './types';

export const useSessionStore = create<OnboardingSessionState>((set) => ({
  sessionId: null,
  status: null,
  hasStock: false,
  hadStockLastYear: false,
  hasManipulated: false,
  hasTracability: false,
  hasBought: false,
  isSelling: false,
  hasReturnedFluid: false,
  hasTD: false,
  setSessionId: (sessionId) => set({ sessionId }),
  setStatus: (status) => set({ status }),
  setHasStock: (hasStock) => set({ hasStock }),
  setHadStockLastYear: (hadStockLastYear) => set({ hadStockLastYear }),
  setHasManipulated: (hasManipulated) => set({ hasManipulated }),
  setHasTracability: (hasTracability) => set({ hasTracability }),
  setHasBought: (hasBought) => set({ hasBought }),
  setIsSelling: (isSelling) => set({ isSelling }),
  setHasReturnedFluid: (hasReturnedFluid) => set({ hasReturnedFluid }),
  setHasTD: (hasTD) => set({ hasTD }),
  resetSession: () => set({
    sessionId: null,
    status: null,
    hasStock: false,
    hadStockLastYear: false,
    hasManipulated: false,
    hasTracability: false,
    hasBought: false,
    isSelling: false,
    hasReturnedFluid: false,
    hasTD: false,
  }),
})); 