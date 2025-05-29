import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';

const AuthPage = () => {
  const { login, register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordStep, setForgotPasswordStep] = useState<'email' | 'otp' | 'password'>('email');
  const [forgotEmail, setForgotEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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
          description: "Invalid credentials. Please check your email and password.",
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

    if (signupData.password.length < 6) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 6 characters long.",
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
          description: "Welcome to AlkalineAmrit! Please check your email to verify your account.",
        });
      } else {
        toast({
          title: "Registration Failed",
          description: "Email already exists or invalid data. Please try again.",
          variant: "destructive",
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

  const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (forgotPasswordStep === 'email') {
        // Mock API call to send OTP
        setTimeout(() => {
          toast({
            title: "OTP Sent",
            description: "Please check your email for the OTP.",
          });
          setForgotPasswordStep('otp');
          setIsLoading(false);
        }, 1000);
      } else if (forgotPasswordStep === 'otp') {
        // Mock OTP verification
        if (otp === '123456') {
          setForgotPasswordStep('password');
          toast({
            title: "OTP Verified",
            description: "Please set your new password.",
          });
        } else {
          toast({
            title: "Invalid OTP",
            description: "Please enter the correct OTP.",
            variant: "destructive",
          });
        }
        setIsLoading(false);
      } else if (forgotPasswordStep === 'password') {
        if (newPassword !== confirmPassword) {
          toast({
            title: "Password Mismatch",
            description: "Passwords do not match.",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }
        
        // Mock password reset
        setTimeout(() => {
          toast({
            title: "Password Reset Successful",
            description: "Your password has been reset. Please login with your new password.",
          });
          // Reset all states and go back to login
          setShowForgotPassword(false);
          setForgotPasswordStep('email');
          setForgotEmail('');
          setOtp('');
          setNewPassword('');
          setConfirmPassword('');
          setIsLoading(false);
        }, 1000);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
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

  if (showForgotPassword) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl">
          <CardHeader className="text-center">
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowForgotPassword(false)}
                className="p-2"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                AA
              </div>
              <div className="w-8"></div>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800">Forgot Password</CardTitle>
            <p className="text-gray-600">
              {forgotPasswordStep === 'email' && 'Enter your email to receive OTP'}
              {forgotPasswordStep === 'otp' && 'Enter the OTP sent to your email'}
              {forgotPasswordStep === 'password' && 'Set your new password'}
            </p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
              {forgotPasswordStep === 'email' && (
                <div>
                  <Label htmlFor="forgotEmail">Email</Label>
                  <Input
                    id="forgotEmail"
                    type="email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              )}
              
              {forgotPasswordStep === 'otp' && (
                <div>
                  <Label htmlFor="otp">OTP</Label>
                  <Input
                    id="otp"
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter 6-digit OTP"
                    maxLength={6}
                    required
                  />
                  <p className="text-sm text-gray-600 mt-1">
                    OTP sent to {forgotEmail}
                  </p>
                </div>
              )}
              
              {forgotPasswordStep === 'password' && (
                <>
                  <div>
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
                    <Input
                      id="confirmNewPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      required
                    />
                  </div>
                </>
              )}
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : 
                 forgotPasswordStep === 'email' ? 'Send OTP' :
                 forgotPasswordStep === 'otp' ? 'Verify OTP' :
                 'Reset Password'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

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
                
                <div className="flex items-center justify-between">
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
                  
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Forgot Password?
                  </button>
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
