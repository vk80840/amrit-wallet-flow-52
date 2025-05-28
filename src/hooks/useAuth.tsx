import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
}

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: any) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('alkaline_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // New admin authentication for 3 admin accounts
    const adminAccounts = ['neeraj', 'vansh', 'deepanshu'];
    const adminPassword = 'DEepu1234@&';
    
    if (adminAccounts.includes(email.toLowerCase()) && password === adminPassword) {
      const adminUser: User = {
        id: `admin_${email.toLowerCase()}`,
        name: email.charAt(0).toUpperCase() + email.slice(1),
        email: `${email.toLowerCase()}@alkalineamrit.com`,
        mobile: '+91-9999999999',
        userType: 'admin',
        kycStatus: 'approved',
        rank: 'admin',
        referralCode: `ADMIN_${email.toUpperCase()}`
      };
      setUser(adminUser);
      localStorage.setItem('alkaline_user', JSON.stringify(adminUser));
      return true;
    }

    // Legacy admin login for backward compatibility
    if (email === 'admin@alkalineamrit.com' && password === 'DEepu1234@&') {
      const adminUser: User = {
        id: 'admin1',
        name: 'Admin',
        email: 'admin@alkalineamrit.com',
        mobile: '+91-9999999999',
        userType: 'admin',
        kycStatus: 'approved',
        rank: 'admin',
        referralCode: 'ADMIN001'
      };
      setUser(adminUser);
      localStorage.setItem('alkaline_user', JSON.stringify(adminUser));
      return true;
    }

    // Mock user login with salary level
    if (email && password) {
      const mockUser: User = {
        id: 'GB00001',
        name: 'Test User',
        email: email,
        mobile: '+91-9876543210',
        userType: 'user',
        kycStatus: 'pending',
        rank: 'Silver', // This will be determined by salary level
        referralCode: 'TEST001'
      };
      setUser(mockUser);
      localStorage.setItem('alkaline_user', JSON.stringify(mockUser));
      return true;
    }

    return false;
  };

  const register = async (userData: any): Promise<boolean> => {
    // Mock registration - replace with real API call
    const newUser: User = {
      id: `GB${String(Math.floor(Math.random() * 99999)).padStart(5, '0')}`,
      name: userData.name,
      email: userData.email,
      mobile: userData.mobile,
      userType: 'user',
      kycStatus: 'pending',
      rank: 'Wood',
      referralCode: `REF${String(Math.floor(Math.random() * 99999)).padStart(5, '0')}`
    };
    
    setUser(newUser);
    localStorage.setItem('alkaline_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('alkaline_user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAdmin: user?.userType === 'admin',
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
