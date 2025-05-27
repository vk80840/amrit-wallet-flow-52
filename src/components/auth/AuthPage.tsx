
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';

const AuthPage = () => {
  const { login, register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    mobile: '',
    side: 'left',
    referralCode: '',
    sponsorName: '',
    password: '',
    confirmPassword: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await login(loginData.email, loginData.password);
      if (success) {
        toast({
          title: "Login Successful",
          description: "Welcome back to AlkalineAmrit!",
        });
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid credentials. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signupData.password !== signupData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const success = await register(signupData);
      if (success) {
        toast({
          title: "Registration Successful",
          description: "Welcome to AlkalineAmrit!",
        });
      }
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReferralCodeChange = (code: string) => {
    setSignupData(prev => ({ ...prev, referralCode: code }));
    
    // Mock sponsor name lookup
    if (code) {
      setTimeout(() => {
        setSignupData(prev => ({ ...prev, sponsorName: 'John Doe' }));
      }, 500);
    } else {
      setSignupData(prev => ({ ...prev, sponsorName: '' }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl">
        <CardHeader className="text-center">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white text-xl font-bold mb-4">
            AA
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">AlkalineAmrit</CardTitle>
          <p className="text-gray-600">Making water alkaline...</p>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email / User ID</Label>
                  <Input
                    id="email"
                    type="text"
                    value={loginData.email}
                    onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter email or user ID"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={loginData.password}
                    onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="Enter password"
                    required
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={loginData.rememberMe}
                    onChange={(e) => setLoginData(prev => ({ ...prev, rememberMe: e.target.checked }))}
                    className="rounded"
                  />
                  <Label htmlFor="rememberMe" className="text-sm">Remember Me</Label>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={signupData.name}
                    onChange={(e) => setSignupData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter full name"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="signupEmail">Email</Label>
                  <Input
                    id="signupEmail"
                    type="email"
                    value={signupData.email}
                    onChange={(e) => setSignupData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter email"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="mobile">Mobile</Label>
                  <Input
                    id="mobile"
                    type="tel"
                    value={signupData.mobile}
                    onChange={(e) => setSignupData(prev => ({ ...prev, mobile: e.target.value }))}
                    placeholder="Enter mobile number"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="side">Side</Label>
                  <select 
                    id="side"
                    value={signupData.side}
                    onChange={(e) => setSignupData(prev => ({ ...prev, side: e.target.value }))}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="referralCode">Referral Code (Optional)</Label>
                  <Input
                    id="referralCode"
                    type="text"
                    value={signupData.referralCode}
                    onChange={(e) => handleReferralCodeChange(e.target.value)}
                    placeholder="Enter referral code"
                  />
                  {signupData.sponsorName && (
                    <p className="text-green-600 text-sm mt-1">Sponsor: {signupData.sponsorName}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="signupPassword">Password</Label>
                  <Input
                    id="signupPassword"
                    type="password"
                    value={signupData.password}
                    onChange={(e) => setSignupData(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="Enter password"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={signupData.confirmPassword}
                    onChange={(e) => setSignupData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    placeholder="Confirm password"
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating Account...' : 'Sign Up'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;
