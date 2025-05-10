
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useToast } from "@/components/ui/use-toast";

// Define user roles
export type UserRole = 'admin' | 'owner' | 'user' | 'visitor';

// Define user interface
export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  ownedActivities?: number[]; // Only relevant for owners
}

// Define auth context interface
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo purposes
const mockUsers: User[] = [
  { id: 1, name: 'مدير النظام', email: 'admin@example.com', role: 'admin' },
  { id: 2, name: 'شركة الفنادق الدولية', email: 'owner@example.com', role: 'owner', ownedActivities: [1, 4] },
  { id: 3, name: 'مستخدم عادي', email: 'user@example.com', role: 'user' },
];

export const AuthProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  // Check if user is authenticated
  const isAuthenticated = !!user;

  // Login function
  const login = async (email: string, password: string) => {
    // In a real app, this would make an API call to authenticate
    const foundUser = mockUsers.find(u => u.email === email);
    
    if (foundUser) {
      // Password validation would happen here in a real app
      setUser(foundUser);
      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: `مرحبًا ${foundUser.name}`,
      });
    } else {
      toast({
        title: "فشل تسجيل الدخول",
        description: "البريد الإلكتروني أو كلمة المرور غير صحيحة",
        variant: "destructive",
      });
      throw new Error('Invalid credentials');
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string, role: UserRole) => {
    // In a real app, this would make an API call to register the user
    const existingUser = mockUsers.find(u => u.email === email);
    
    if (existingUser) {
      toast({
        title: "فشل التسجيل",
        description: "البريد الإلكتروني مسجل مسبقًا",
        variant: "destructive",
      });
      throw new Error('Email already exists');
    }

    // Create new user
    const newUser: User = {
      id: mockUsers.length + 1,
      name,
      email,
      role,
      ownedActivities: role === 'owner' ? [] : undefined,
    };

    // In a real app, this would be added to the database
    mockUsers.push(newUser);
    setUser(newUser);
    
    toast({
      title: "تم التسجيل بنجاح",
      description: `مرحبًا ${name}`,
    });
  };

  // Logout function
  const logout = () => {
    setUser(null);
    toast({
      title: "تم تسجيل الخروج",
    });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
