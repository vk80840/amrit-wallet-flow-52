
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';

interface UserProfile {
  id: string;
  user_id: string;
  name: string;
  email: string;
  mobile: string;
  kyc_status: string;
  rank: string;
  referral_code: string;
  sponsor_id: string;
  side: string;
  is_active: boolean;
  created_at: string;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  session: Session | null;
  loading: boolean;
  login: (userIdOrEmail: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
}

interface RegisterData {
  user_id: string;
  name: string;
  email: string;
  mobile: string;
  password: string;
  referral_code?: string;
  side?: 'left' | 'right';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchUserProfile = async (user: User) => {
    try {
      const { data: profile, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', user.email)
        .single();

      if (error) throw error;
      setUserProfile(profile);
      
      // Store in localStorage for persistence
      localStorage.setItem('userProfile', JSON.stringify(profile));
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const generateUserId = async () => {
    const { data, error } = await supabase
      .from('users')
      .select('user_id')
      .order('user_id', { ascending: false })
      .limit(1);

    if (error) throw error;

    if (data && data.length > 0) {
      const lastUserId = data[0].user_id;
      const numericPart = parseInt(lastUserId.substring(2)) + 1;
      return `AU${numericPart.toString().padStart(5, '0')}`;
    } else {
      return 'AU00001';
    }
  };

  useEffect(() => {
    // Check for stored session
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      setUserProfile(JSON.parse(storedProfile));
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user && !userProfile) {
        fetchUserProfile(session.user);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (event === 'SIGNED_IN' && session?.user) {
        await fetchUserProfile(session.user);
      } else if (event === 'SIGNED_OUT') {
        setUserProfile(null);
        localStorage.removeItem('userProfile');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (userIdOrEmail: string, password: string) => {
    setLoading(true);
    try {
      let email = userIdOrEmail;
      
      // Check if input is user_id format (AU00001)
      if (userIdOrEmail.match(/^AU\d{5}$/)) {
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('email')
          .eq('user_id', userIdOrEmail)
          .single();

        if (userError || !userData) {
          throw new Error('User ID not found');
        }
        email = userData.email;
      }

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
    } catch (error: any) {
      throw new Error(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: RegisterData) => {
    setLoading(true);
    try {
      const userId = await generateUserId();
      
      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
      });

      if (authError) throw authError;

      // Create user profile
      const { error: profileError } = await supabase
        .from('users')
        .insert({
          id: authData.user?.id,
          user_id: userId,
          name: userData.name,
          email: userData.email,
          mobile: userData.mobile,
          referral_code: `REF${userId}`,
          sponsor_id: userData.referral_code,
          side: userData.side || 'left',
          kyc_status: 'pending',
          rank: 'Associate',
          is_active: true,
        });

      if (profileError) throw profileError;

      // Create wallet
      await supabase.from('wallets').insert({
        user_id: authData.user?.id,
        main_balance: 0,
        topup_balance: 0,
      });

      // Create STK wallet
      await supabase.from('stk_wallets').insert({
        user_id: authData.user?.id,
        total_balance: 0,
        locked_balance: 0,
        unlocked_balance: 0,
      });

    } catch (error: any) {
      throw new Error(error.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUser(null);
      setUserProfile(null);
      setSession(null);
      localStorage.removeItem('userProfile');
    } catch (error: any) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      userProfile,
      session,
      loading,
      login,
      register,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
