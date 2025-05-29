import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User as SupabaseUser } from '@supabase/supabase-js';

interface User {
  id: string;
  name: string;
  email: string;
  mobile: string;
  userType: 'user' | 'admin';
  profilePicture?: string;
  kycStatus: 'pending' | 'approved' | 'rejected';
  rank: string;
  referralCode: string;
  userId: string;
}

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  session: Session | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: any) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        fetchUserProfile(session.user);
      } else {
        setLoading(false);
      }
    }).catch(() => {
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      if (session?.user) {
        await fetchUserProfile(session.user);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (authUser: SupabaseUser) => {
    try {
      // Check if this is an admin user (predefined admin emails)
      const adminEmails = ['neeraj@alkalineamrit.com', 'vansh@alkalineamrit.com', 'deepanshu@alkalineamrit.com', 'admin@alkalineamrit.com'];
      const isAdmin = adminEmails.includes(authUser.email || '');

      if (isAdmin) {
        // Create admin user object
        const adminUser: User = {
          id: authUser.id,
          name: authUser.email?.split('@')[0]?.charAt(0).toUpperCase() + authUser.email?.split('@')[0]?.slice(1) || 'Admin',
          email: authUser.email || '',
          mobile: '+91-9999999999',
          userType: 'admin',
          kycStatus: 'approved',
          rank: 'admin',
          referralCode: `ADMIN_${authUser.email?.split('@')[0]?.toUpperCase()}`,
          userId: `ADMIN_${authUser.email?.split('@')[0]?.toUpperCase()}`
        };
        setUser(adminUser);
        setIsAdmin(true);
        setLoading(false);
        return;
      }

      // Fetch regular user profile from database
      const { data: userProfile, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', authUser.email)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        setLoading(false);
        return;
      }

      if (userProfile) {
        // Ensure kycStatus is properly typed
        const kycStatus = userProfile.kyc_status as 'pending' | 'approved' | 'rejected' || 'pending';

        const user: User = {
          id: userProfile.id,
          name: userProfile.name,
          email: userProfile.email,
          mobile: userProfile.mobile,
          userType: 'user',
          kycStatus: kycStatus,
          rank: userProfile.rank,
          referralCode: userProfile.referral_code,
          userId: userProfile.user_id
        };
        setUser(user);
        setIsAdmin(false);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Login error:', error.message);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: any): Promise<boolean> => {
    try {
      setLoading(true);

      // First create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
      });

      if (authError) {
        console.error('Auth registration error:', authError.message);
        return false;
      }

      if (authData.user) {
        // Generate user ID (AU00001 format)
        const { data: existingUsers } = await supabase
          .from('users')
          .select('user_id')
          .order('created_at', { ascending: false })
          .limit(1);

        let nextNumber = 1;
        if (existingUsers && existingUsers.length > 0) {
          const lastUserId = existingUsers[0].user_id;
          const lastNumber = parseInt(lastUserId.substring(2));
          nextNumber = lastNumber + 1;
        }

        const newUserId = `AU${String(nextNumber).padStart(5, '0')}`;

        // Create user profile in database
        const { error: profileError } = await supabase
          .from('users')
          .insert({
            id: authData.user.id,
            user_id: newUserId,
            email: userData.email,
            password_hash: 'managed_by_supabase_auth', // Placeholder since Supabase handles this
            name: userData.name,
            mobile: userData.mobile,
            referral_code: `REF${String(Math.floor(Math.random() * 9999) + 1).padStart(4, '0')}`,
            side: userData.side,
            rank: 'Bronze',
            kyc_status: 'pending'
          });

        if (profileError) {
          console.error('Profile creation error:', profileError.message);
          return false;
        }

        // Create wallet for the user
        await supabase
          .from('wallets')
          .insert({
            user_id: authData.user.id,
            main_balance: 0.00,
            topup_balance: 0.00
          });

        // Create STK wallet for the user
        await supabase
          .from('stk_wallets')
          .insert({
            user_id: authData.user.id,
            total_balance: 0,
            locked_balance: 0,
            unlocked_balance: 0
          });
      }

      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      setIsAdmin(false);
      // Redirect to login after logout
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAdmin: user?.userType === 'admin',
      session,
      loading,
      login,
      logout,
      register
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};