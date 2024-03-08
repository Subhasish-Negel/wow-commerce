export type IUser = {
  id: string;
  name: string;
  role: string;
  email: string;
  image: string;
};

export type AuthState = {
  userData: IUser | {};
};

export type AuthActions = {
  setUserData: (user: IUser) => void;
};
