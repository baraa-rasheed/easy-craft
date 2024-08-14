import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface IUser { 
  email: string;
  lastname: string;
  username: string; 
  firstname: string; 
}

interface AuthState {
  userTokens: {
    token: string;
    group: string;
    isAdmin: string;
    csrfToken: string;
    refreshToken: string;
  } | null;
  pingTokens: {
    id_token: string;
    expires_in: number;
    token_type: string;
    access_token: string;
    refresh_token: string;
  } | null;
  user: IUser | null;
  setUser: (user: IUser) => void;
  setPingTokens: (pingTokens: AuthState["pingTokens"]) => void;
  setUserTokens: (userTokens: AuthState["userTokens"]) => void;
  reset: () => void;
}

const INIT_STATE = { user: null, userTokens: null, pingTokens: null };

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      ...INIT_STATE,
      setUser: (user) => set({ user }),
      setPingTokens: (pingTokens) => set({ pingTokens }),
      setUserTokens: (userTokens) => set({ userTokens }),
      reset: () => set(INIT_STATE),
    }),
    { name: "auth-storage", storage: createJSONStorage(() => sessionStorage) },
  ),
);
