import { create } from "zustand";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SecretCommand {
  id:      string;
  command: string;   // e.g. "/zelda"
  label:   string;   // shown in palette
  hint:    string;   // subtitle in palette
  emoji:   string;
}

interface SecretState {
  // Active flags
  isZeldaActive: boolean;
  isVoltMode:    boolean;
  isBlastMode:   boolean;

  // Actions
  activateZelda:   () => void;
  deactivateZelda: () => void;
  toggleVolt:      () => void;
  toggleBlast:     () => void;
  deactivateAll:   () => void;
}

// ─── Store ────────────────────────────────────────────────────────────────────

export const useSecretStore = create<SecretState>((set) => ({
  isZeldaActive: false,
  isVoltMode:    false,
  isBlastMode:   false,

  activateZelda:   () => set({ isZeldaActive: true }),
  deactivateZelda: () => set({ isZeldaActive: false }),
  toggleVolt:      () => set((s) => ({ isVoltMode: !s.isVoltMode })),
  toggleBlast:     () => set((s) => ({ isBlastMode: !s.isBlastMode })),
  deactivateAll:   () => set({ isZeldaActive: false, isVoltMode: false, isBlastMode: false }),
}));

// ─── Secret command registry ──────────────────────────────────────────────────
// Add new Easter eggs here — CommandPalette reads this array automatically.

export const SECRET_COMMANDS: SecretCommand[] = [
  {
    id:      "zelda",
    command: "/zelda",
    label:   "El Infiltrado",
    hint:    "Una visitante sigilosa cruza la pantalla",
    emoji:   "🐱",
  },
  {
    id:      "pikachu",
    command: "/pikachu",
    label:   "Volt Mode",
    hint:    "Electrifica cada clic del ratón",
    emoji:   "⚡",
  },
  {
    id:      "sonic",
    command: "/sonic",
    label:   "Blast Mode",
    hint:    "Scroll a velocidad sónica",
    emoji:   "💨",
  },
];
