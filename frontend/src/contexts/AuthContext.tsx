import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: '2300090128@kluniversity.in',
    role: 'user',
    isAdmin: false,
    silPoints: 85,
    eventsAttended: 5,
    eventsRegistered: 7,
  },
  {
    id: '2',
    name: 'Admin User',
    email: 'admin@kluniversity.in',
    role: 'president',
    isAdmin: true,
    silPoints: 0,
    eventsAttended: 0,
    eventsRegistered: 0,
  },
];

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user on app start
    const storedUser = localStorage.getItem('rubix_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const validateKLUEmail = (email: string): boolean => {
    return email.endsWith('@kluniversity.in');
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (!validateKLUEmail(email)) {
      setIsLoading(false);
      return false;
    }

    const mockUser = mockUsers.find(u => u.email === email);
    if (mockUser && password === 'password123') {
      setUser(mockUser);
      localStorage.setItem('rubix_user', JSON.stringify(mockUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const signup = async (name: string, email: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (!validateKLUEmail(email)) {
      setIsLoading(false);
      return false;
    }

    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      role: 'user',
      isAdmin: false,
      silPoints: 0,
      eventsAttended: 0,
      eventsRegistered: 0,
    };

    setUser(newUser);
    localStorage.setItem('rubix_user', JSON.stringify(newUser));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('rubix_user');
  };

  const value: AuthContextType = {
    user,
    login,
    signup,
    logout,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};