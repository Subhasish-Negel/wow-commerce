import { create } from "zustand";

export const authStore = create((set, get) => ({
  userData: {},
}));
