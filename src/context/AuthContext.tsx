import React, { createContext, useContext, useState } from 'react';

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  signup: (email: string, password: string) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const login = (email: string, password: string) => {
    // Simple auth state - no local storage
    // Will be replaced with Supabase later
    if (email && password) {
      setIsAuthenticated(true);
    }
  };

  const signup = (email: string, password: string) => {
    // Simple auth state - no local storage
    // Will be replaced with Supabase later
    if (email && password) {
      setIsAuthenticated(true);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const value: AuthContextType = {
    isAuthenticated,
    isLoading,
    login,
    logout,
    signup,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    // Return default values instead of throwing error
    return {
      isAuthenticated: false,
      isLoading: false,
      login: () => {},
      logout: () => {},
      signup: () => {},
    };
  }
  return context;
};
