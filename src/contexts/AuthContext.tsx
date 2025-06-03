
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

// Define user roles - matching the database enum
export type UserRole = 'admin' | 'owner' | 'user' | 'visitor';

// Define user interface - extending Supabase user with profile data
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  created_at: string;
  updated_at: string;
}

// Define auth context interface
interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Check if user is authenticated
  const isAuthenticated = !!user && !!session;

  // Fetch user profile from the profiles table
  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return null;
      }

      return data as UserProfile;
    } catch (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
  };

  // Set up auth state listener
  useEffect(() => {
    let mounted = true;

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;

        console.log('Auth state changed:', event, session?.user?.id);
        
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          // Fetch user profile data with a small delay to ensure the trigger has completed
          setTimeout(async () => {
            const profileData = await fetchUserProfile(session.user.id);
            if (mounted) {
              setProfile(profileData);
            }
          }, 100);
        } else {
          setProfile(null);
        }

        setIsLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return;
      
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchUserProfile(session.user.id).then(profileData => {
          if (mounted) {
            setProfile(profileData);
          }
        });
      }
      
      setIsLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: "فشل تسجيل الدخول",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }

      if (data.user) {
        toast({
          title: "تم تسجيل الدخول بنجاح",
          description: `مرحبًا بك`,
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string, role: UserRole) => {
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            name: name,
            role: role,
          }
        }
      });

      if (error) {
        let errorMessage = error.message;
        
        // Provide more user-friendly error messages
        if (error.message.includes('User already registered')) {
          errorMessage = 'هذا البريد الإلكتروني مسجل بالفعل. يرجى استخدام بريد إلكتروني آخر أو تسجيل الدخول.';
        } else if (error.message.includes('Invalid email')) {
          errorMessage = 'البريد الإلكتروني غير صالح. يرجى التحقق من البريد الإلكتروني والمحاولة مرة أخرى.';
        } else if (error.message.includes('Password')) {
          errorMessage = 'كلمة المرور ضعيفة. يجب أن تكون كلمة المرور على الأقل 6 أحرف.';
        }
        
        toast({
          title: "فشل التسجيل",
          description: errorMessage,
          variant: "destructive",
        });
        throw error;
      }

      if (data.user) {
        toast({
          title: "تم التسجيل بنجاح",
          description: `مرحبًا ${name}! تم إنشاء حسابك بنجاح.`,
        });
      }
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        toast({
          title: "خطأ في تسجيل الخروج",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }

      toast({
        title: "تم تسجيل الخروج",
      });
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      profile, 
      session, 
      isAuthenticated, 
      isLoading, 
      login, 
      register, 
      logout 
    }}>
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
