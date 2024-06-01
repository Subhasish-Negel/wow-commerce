import {
  AuthActions,
  AuthState,
  IUser,
  ICart,
  IProduct,
} from "@/lib/Zustand/constant";
import { create } from "zustand";
import { BASE_URL } from "@/lib/constant/constant";

export const authStore = create<AuthState & AuthActions>((set, get) => ({
  userData: null,
  isAuthenticated: true,
  cart: {}, // Initialize cart as an empty object
  products: [], // Initialize products as an empty array
  setUserData: (user: IUser | null) => set({ userData: user }),
  setIsAuthenticated: (isAuth: boolean) => set({ isAuthenticated: isAuth }),
  checkAuthStatus: async () => {
    try {
      const response = await fetch(`${BASE_URL}/checkauth`, {
        credentials: "include",
      });
      if (response.ok) {
        set({ isAuthenticated: true });
      } else if (response.status === 401) {
        set({ isAuthenticated: false });
      }
    } catch (error) {
      set({ isAuthenticated: false });
    }
  },
  fetchUserData: async () => {
    try {
      const response: any = await fetch(`${BASE_URL}/profile`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      set({ userData: data.user });
    } catch (error: any) {
      console.error("Error fetching user data:", error);
      set({ userData: null });
    }
  },
  fetchCart: async () => {
    try {
      const response: any = await fetch(`${BASE_URL}/cart`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      set({ cart: data }); // Update the cart state with the fetched cart data
    } catch (error: any) {
      console.error("Error fetching cart data:", error);
      set({ cart: {} }); // Reset the cart state to an empty object on error
    }
  },
  fetchProducts: async () => {
    try {
      const response: any = await fetch(`${BASE_URL}/products`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data.products);
      set({ products: data.products }); // Update the products state with the fetched product data
    } catch (error: any) {
      console.error("Error fetching product data:", error);
      set({ products: [] }); // Reset the products state to an empty array on error
    }
  },
}));
