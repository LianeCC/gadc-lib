export type OnboardingSessionStatus = 'IN_PROGRESS' | 'SAVED' | 'RESET';

export interface OnboardingSession {
  id: string;
  status: OnboardingSessionStatus;
  created_at: string;
  updated_at: string;
}

export interface OnboardingSessionState {
  sessionId: string | null;
  status: OnboardingSessionStatus | null;
  hasStock: boolean;
  hadStockLastYear: boolean;
  hasManipulated: boolean;
  hasTracability: boolean;
  hasBought: boolean;
  isSelling: boolean;
  hasReturnedFluid: boolean;
  hasTD: boolean;
  setSessionId: (sessionId: string | null) => void;
  setStatus: (status: OnboardingSessionStatus | null) => void;
  setHasStock: (hasStock: boolean) => void;
  setHadStockLastYear: (hadStockLastYear: boolean) => void;
  setHasManipulated: (hasManipulated: boolean) => void;
  setHasTracability: (hasTracability: boolean) => void;
  setHasBought: (hasBought: boolean) => void;
  setIsSelling: (isSelling: boolean) => void;
  setHasReturnedFluid: (hasReturnedFluid: boolean) => void;
  setHasTD: (hasTD: boolean) => void;
  resetSession: () => void;
} 