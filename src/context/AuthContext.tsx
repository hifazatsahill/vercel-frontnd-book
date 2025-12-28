'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing token on component mount
    const storedToken = localStorage.getItem('auth_token');
    if (storedToken) {
      setToken(storedToken);
      // In a real app, you would fetch user details here
      // For now, we'll just set loading to false
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // This would be an actual API call in the real implementation
      // const response = await apiClient.post('/api/auth/login', { email, password });
      // const { access_token, user } = response.data;

      // Mock implementation for now
      const mockToken = 'mock-jwt-token';
      const mockUser: User = {
        id: 'mock-user-id',
        email,
        name: 'Test User',
        is_active: true,
        created_at: new Date().toISOString(),
      };

      localStorage.setItem('auth_token', mockToken);
      setToken(mockToken);
      setUser(mockUser);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: any) => {
    setLoading(true);
    try {
      // This would be an actual API call in the real implementation
      // const response = await apiClient.post('/api/auth/register', userData);
      // const { access_token, user } = response.data;

      // Mock implementation for now
      const mockToken = 'mock-jwt-token';
      const mockUser: User = {
        id: 'mock-user-id',
        email: userData.email,
        name: userData.name,
        is_active: true,
        created_at: new Date().toISOString(),
      };

      localStorage.setItem('auth_token', mockToken);
      setToken(mockToken);
      setUser(mockUser);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setToken(null);
    setUser(null);
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData });
    }
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}