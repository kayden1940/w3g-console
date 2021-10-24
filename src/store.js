import create from "zustand";

export const useStore = create((set) => ({
  // bears: 0,
  authed: false,
  loading: false,
  me: null,

  // actions
  // increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  // removeAllBears: () => set({ bears: 0 }),
  setAuthed: (authed) => set(() => ({ authed })),
  setLoading: (loading) => set(() => ({ loading })),
  setMe: (me) => set(() => ({ me })),
}));
