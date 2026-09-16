export interface User {
  id: string;
  login: string;
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  login: string;
  password: string;
}
