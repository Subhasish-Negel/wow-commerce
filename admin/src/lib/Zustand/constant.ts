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

export type IProduct = {
  id: string;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};

export interface AuthState {
  userData: IUser | null;
  isAuthenticated: boolean;
  cart: ICart | {} | null;
  products: IProduct[]; // Add products array to the state
}

export interface AuthActions {
  setUserData: (user: IUser | null) => void;
  setIsAuthenticated: (isAuth: boolean) => void;
  checkAuthStatus: () => Promise<void>;
  fetchUserData: () => Promise<void>;
  fetchCart: () => Promise<void>;
  fetchProducts: () => Promise<void>;
}
