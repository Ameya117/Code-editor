import {create} from "zustand"

export const useThemeStore = create((set) => ({
    theme: "light",
    toggleDarkTheme: () => set(() => ({ theme: "dark" })),
    toggleLightTheme: () => set(() => ({ theme: "light" })),
  }))