
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Wallet, Users, TrendingUp, Calendar, Mail, Phone, Award, CreditCard, Target, DollarSign } from 'lucide-react';

interface DashboardData {
  wallet?: {
    main_balance: number;
    topup_balance: number;
  };
  totalTeam: number;
  directTeam: number;
  totalPurchases: number;
  referralBonus: number;
  businessVolume: number;
  monthlySalary: number;
}

const DashboardContent = () => {
  const { userProfile } = useAuth();
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    totalTeam: 0,
    directTeam: 0,
    totalPurchases: 0,
    referralBonus: 0,
    businessVolume: 0,
    monthlySalary: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userProfile?.id) {
      fetchDashboardData();
    }
  }, [userProfile]);

  const fetchDashboardData = async () => {
    try {
      // Fetch wallet data
      const { data: walletData } = await supabase
        .from('wallets')
        .select('main_balance, topup_balance')
        .eq('user_id', userProfile?.id)
        .single();

      // Fetch team data
      const { data: teamData } = await supabase
        .from('users')
        .select('id')
        .eq('sponsor_id', userProfile?.referral_code);

      // Fetch orders data
      const { data: ordersData } = await supabase
        .from('orders')
        .select('amount, bv_credited')
        .eq('user_id', userProfile?.id);

      // Fetch commission data
      const { data: commissionsData } = await supabase
        .from('commissions')
        .select('amount')
        .eq('user_id', userProfile?.id);

      const totalPurchases = ordersData?.reduce((sum, order) => sum + order.amount, 0) || 0;
      const referralBonus = commissionsData?.reduce((sum, comm) => sum + comm.amount, 0) || 0;
      const businessVolume = ordersData?.reduce((sum, order) => sum + order.bv_credited, 0) || 0;

      setDashboardData({
        wallet: walletData || { main_balance: 0, topup_balance: 0 },
        totalTeam: teamData?.length || 0,
        directTeam: teamData?.length || 0,
        totalPurchases,
        referralBonus,
        businessVolume,
        monthlySalary: 0, // Calculate based on rank and BV
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Profile Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Avatar className="w-20 h-20">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback className="text-2xl bg-white/20">
              {userProfile?.name?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold">{userProfile?.name}</h2>
                <p className="text-blue-100">ID: {userProfile?.user_id}</p>
              </div>
              <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
                <Badge variant="secondary" className="bg-white/20 text-white">
                  {userProfile?.rank}
                </Badge>
                <Badge 
                  variant={userProfile?.kyc_status === 'approved' ? 'default' : 'destructive'}
                  className={userProfile?.kyc_status === 'approved' ? 'bg-green-500' : 'bg-red-500'}
                >
                  KYC: {userProfile?.kyc_status}
                </Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 text-sm text-blue-100">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>{userProfile?.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>{userProfile?.mobile}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Joined: {userProfile?.created_at ? new Date(userProfile.created_at).toLocaleDateString() : 'N/A'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4" />
                <span>Salary Level: {userProfile?.rank}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wallet Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between">
              <span>Top-up Balance</span>
              <Wallet className="w-6 h-6" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">₹{dashboardData.wallet?.topup_balance?.toLocaleString() || '0'}</p>
            <p className="text-blue-100 text-sm mt-1">Available for shopping</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between">
              <span>Main Balance</span>
              <CreditCard className="w-6 h-6" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">₹{dashboardData.wallet?.main_balance?.toLocaleString() || '0'}</p>
            <p className="text-green-100 text-sm mt-1">Withdrawable amount</p>
          </CardContent>
        </Card>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <DollarSign className="w-4 h-4 mr-2 text-green-500" />
              Purchased Amount
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">₹{dashboardData.totalPurchases.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <TrendingUp className="w-4 h-4 mr-2 text-blue-500" />
              Referral Bonus
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">₹{dashboardData.referralBonus.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Users className="w-4 h-4 mr-2 text-purple-500" />
              Total Team
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{dashboardData.totalTeam}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Users className="w-4 h-4 mr-2 text-orange-500" />
              Direct Team
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{dashboardData.directTeam}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Target className="w-4 h-4 mr-2 text-indigo-500" />
              Business Volume
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{dashboardData.businessVolume} BV</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Award className="w-4 h-4 mr-2 text-yellow-500" />
              Current Rank
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{userProfile?.rank}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Referral Code
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-bold text-blue-600">{userProfile?.referral_code}</p>
            <div className="mt-2 text-xs text-gray-500">
              <p>Left Link: {userProfile?.referral_code}/left</p>
              <p>Right Link: {userProfile?.referral_code}/right</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <DollarSign className="w-4 h-4 mr-2 text-green-500" />
              Monthly Salary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">₹{dashboardData.monthlySalary.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardContent;
