export type IUser = {
  id: string;
  name: string;
  role: string;
  email: string;
  image: string;
};

export type ICartItems = {
  id: string;
  cart_id: string;
  product_id: string;
  quantity: number;
};

export type ICart = {
  id: string;
  user_id: string;
  cartItems: ICartItems[];
};

export interface AuthState {
  userData: IUser | null;
  isAuthenticated: boolean;
  cart: ICart | {} | null; // Allow null for cart
}

export interface AuthActions {
  setUserData: (user: IUser | null) => void;
  setIsAuthenticated: (isAuth: boolean) => void;
  checkAuthStatus: () => Promise<void>;
  fetchUserData: () => Promise<void>;
  fetchCart: () => Promise<void>; // Add the fetchCart action
}

