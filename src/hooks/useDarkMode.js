import { create as add } from "zustand";


const useDarkMode = add((set) => ({
    isDark:false,
    toggleDark: () => set((state)=>({isDark: !state.isDark}))
}));

export default useDarkMode;
