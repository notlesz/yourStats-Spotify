import { create } from 'zustand';
import { User } from '@/types/user';
import { logoutAction } from '@/actions/auth';

interface UserState {
  user: User | null;
  actions: {
    setUser: (user: User | null) => void;
    logout: (navigateToRoot: () => void) => Promise<void>;
  };
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  actions: {
    setUser: (user) => set({ user }),

    logout: async (navigateToRoot) => {
      await logoutAction();
      set({ user: null });
      navigateToRoot();
    },
  },
}));
