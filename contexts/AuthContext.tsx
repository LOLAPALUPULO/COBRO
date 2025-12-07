
import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { UserLevel } from '../types';
import { ADMIN_PASSWORD, SELLER_PASSWORD } from '../constants';

interface AuthContextType {
  userLevel: UserLevel;
  login: (password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const [userLevel, setUserLevel] = useState<UserLevel>(null);

  const login = useCallback((password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setUserLevel('admin');
      return true;
    } else if (password === SELLER_PASSWORD) {
      setUserLevel('seller');
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setUserLevel(null);
  }, []);

  return (
    <AuthContext.Provider value={{ userLevel, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }
  return context;
};
    