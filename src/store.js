import create from "zustand";

export const useStore = create((set) => ({
  authed: false,
  loading: false,
  me: null,

  sites: [],
  stats: [],
  tasks: [],

  // actions
  // increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  // removeAllBears: () => set({ bears: 0 }),
  setAuthed: (authed) => set(() => ({ authed })),
  setLoading: (loading) => set(() => ({ loading })),
  setMe: (me) => set(() => ({ me })),

  setSites: (sites) => set(() => ({ sites })),
  setStats: (stats) => set(() => ({ stats })),
  setTasks: (tasks) => set(() => ({ tasks })),
}));
