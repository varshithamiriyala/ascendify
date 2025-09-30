"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import type { User, Role } from '@/lib/types';
import { allUsers } from '@/lib/data';

interface UserContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  switchRole: (role: Role) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // On initial load, try to get user from localStorage
    try {
      const storedUser = localStorage.getItem('ascendify-user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('ascendify-user');
    }
  }, []);

  const login = (loggedInUser: User) => {
    setUser(loggedInUser);
    localStorage.setItem('ascendify-user', JSON.stringify(loggedInUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ascendify-user');
  };

  const switchRole = (role: Role) => {
    // In a real app, this would be a more complex operation.
    // Here we just find a user with the target role.
    const userToSwitchTo = allUsers.find(u => u.role === role);
    if (userToSwitchTo) {
      login(userToSwitchTo);
    }
  };

  return (
    <UserContext.Provider value={{ user, login, logout, switchRole }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
