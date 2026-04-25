import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAdmin: boolean;
  loginUser: (user: User) => void;
  loginAdmin: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAdmin: false, // For admin panel
      loginUser: (user) => set({ user }),
      loginAdmin: () => set({ isAdmin: true }),
      logout: () => set({ user: null, isAdmin: false }),
    }),
    {
      name: "auth-storage",
    }
  )
);
