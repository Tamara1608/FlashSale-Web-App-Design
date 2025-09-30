import React, { createContext, useContext, useMemo, useState, ReactNode, useEffect } from 'react';
import { AuthService, AuthUser } from '../../services/authService';

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  userId: number | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(AuthService.getUser());

  useEffect(() => {
    // Keep state in sync with localStorage across tabs
    const handler = () => setUser(AuthService.getUser());
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const login = async (username: string, password: string) => {
    const loggedIn = await AuthService.login({ username, password });
    setUser(loggedIn);
  };

  const register = async (username: string, email: string, password: string) => {
    const registered = await AuthService.register({ username, email, password });
    setUser(registered);
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
  };

  const value = useMemo<AuthContextType>(() => ({
    user,
    isAuthenticated: !!user,
    userId: user ? user.id : null,
    login,
    register,
    logout,
  }), [user]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}



