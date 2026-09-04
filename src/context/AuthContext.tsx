'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole } from '@/lib/types';
import { SEED_USERS } from '@/lib/seedData';

interface AuthContextType {
  user: UserProfile | null;
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  login: (email: string) => Promise<boolean>;
  signup: (username: string, email: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  toggle2FA: () => void;
  submitKYC: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Start with default authenticated user containing full multi-role permissions
  const [user, setUser] = useState<UserProfile | null>(SEED_USERS[0]);
  const [activeRole, setActiveRoleState] = useState<UserRole>('buyer');

  useEffect(() => {
    const savedRole = localStorage.getItem('brickly-active-role') as UserRole | null;
    if (savedRole && user?.roles.includes(savedRole)) {
      setActiveRoleState(savedRole);
    }
  }, [user]);

  const setActiveRole = (role: UserRole) => {
    setActiveRoleState(role);
    localStorage.setItem('brickly-active-role', role);
    if (user) {
      setUser({ ...user, activeRole: role });
    }
  };

  const login = async (email: string): Promise<boolean> => {
    const found = SEED_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase()) || SEED_USERS[0];
    setUser(found);
    setActiveRole(found.activeRole || 'buyer');
    return true;
  };

  const signup = async (username: string, email: string): Promise<boolean> => {
    const newUser: UserProfile = {
      id: `user-${Date.now()}`,
      username,
      email,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      roles: ['buyer', 'seller'],
      activeRole: 'buyer',
      currencyPreference: 'INR',
      unitPreference: 'sqft',
      isVerified: false,
      kycStatus: 'none',
      twoFactorEnabled: false,
    };
    setUser(newUser);
    setActiveRole('buyer');
    return true;
  };

  const logout = () => {
    setUser(null);
    setActiveRoleState('guest');
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    setUser(updated);
  };

  const toggle2FA = () => {
    if (!user) return;
    updateProfile({ twoFactorEnabled: !user.twoFactorEnabled });
  };

  const submitKYC = () => {
    if (!user) return;
    updateProfile({ kycStatus: 'verified', isVerified: true });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        activeRole,
        setActiveRole,
        login,
        signup,
        logout,
        updateProfile,
        toggle2FA,
        submitKYC,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
