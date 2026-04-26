import { create } from "zustand";
import { persist } from "zustand/middleware";
import { supabase } from "@/lib/supabase";
import type { Session } from "@supabase/supabase-js";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAdmin: boolean;
  session: Session | null;
  loginUser: (user: User) => void;
  loginAdmin: () => void;
  logout: () => Promise<void>;
  initAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      session: null,
      isAdmin: false,

      loginUser: (user) => set({ user }),
      loginAdmin: () => set({ isAdmin: true }),

      logout: async () => {
        await supabase.auth.signOut();
        set({ user: null, session: null, isAdmin: false });
      },

      initAuth: async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const meta = session.user.user_metadata;
          set({
            session,
            user: {
              id: session.user.id,
              name: meta?.full_name || meta?.name || session.user.email?.split("@")[0] || "İstifadəçi",
              email: session.user.email || "",
              avatar: meta?.avatar_url || meta?.picture,
            },
          });
        }

        // Real-time auth state listener
        supabase.auth.onAuthStateChange((_event, session) => {
          if (session?.user) {
            const meta = session.user.user_metadata;
            set({
              session,
              user: {
                id: session.user.id,
                name: meta?.full_name || meta?.name || session.user.email?.split("@")[0] || "İstifadəçi",
                email: session.user.email || "",
                avatar: meta?.avatar_url || meta?.picture,
              },
            });
          } else {
            set({ user: null, session: null });
          }
        });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ isAdmin: state.isAdmin }),
    }
  )
);
