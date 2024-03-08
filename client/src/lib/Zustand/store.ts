import { AuthActions, AuthState, IUser } from "@/lib/Zustand/constant";
import { create } from "zustand";

export const authStore = create<AuthState & AuthActions>((set, get) => ({
  userData: {},
  setUserData: (user: IUser) => set({ userData: user }),
}));
