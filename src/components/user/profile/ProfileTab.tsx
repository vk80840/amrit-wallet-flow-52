
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Camera, Save, MapPin, CreditCard, FileText, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

const ProfileTab = () => {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('profile');
  
  // Profile form state
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    walletAddress: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Shipping address state
  const [shippingData, setShippingData] = useState({
    mobile: '',
    alternateMobile: '',
    address: '',
    pincode: '',
    landmark: '',
    state: '',
    district: ''
  });

  // Bank details state
  const [bankData, setBankData] = useState({
    accountName: '',
    ifsc: '',
    accountNumber: '',
    branch: '',
    bankName: ''
  });

  // KYC state
  const [kycData, setKycData] = useState({
    panNumber: '',
    aadhaarNumber: '',
    aadhaarFront: null as File | null,
    aadhaarBack: null as File | null,
    panFront: null as File | null,
    panBack: null as File | null
  });

  const [kycStatus, setKycStatus] = useState('pending'); // pending, approved, rejected

  const handleProfileUpdate = () => {
    if (profileData.newPassword && profileData.newPassword !== profileData.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords don't match",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully",
    });
  };

  const handleShippingUpdate = () => {
    toast({
      title: "Shipping Address Updated",
      description: "Your shipping address has been saved",
    });
  };

  const handleBankUpdate = () => {
    toast({
      title: "Bank Details Updated",
      description: "Your bank details have been saved",
    });
  };

  const handleKycSubmit = () => {
    if (!kycData.panNumber || !kycData.aadhaarNumber) {
      toast({
        title: "Error",
        description: "Please fill all KYC details",
        variant: "destructive"
      });
      return;
    }

    setKycStatus('pending');
    toast({
      title: "KYC Submitted",
      description: "Your KYC documents have been submitted for review",
    });
  };

  const handleFileUpload = (field: string, file: File | null) => {
    setKycData(prev => ({ ...prev, [field]: file }));
  };

  const sections = [
    { id: 'profile', label: 'Profile', icon: Camera },
    { id: 'shipping', label: 'Shipping Address', icon: MapPin },
    { id: 'bank', label: 'Bank Details', icon: CreditCard },
    { id: 'kyc', label: 'KYC Verification', icon: FileText },
  ];

  return (
    <div className="space-y-6">
      {/* Section Navigation */}
      <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <Button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                variant={activeSection === section.id ? 'default' : 'outline'}
                className="h-auto p-4 flex flex-col space-y-2"
              >
                <Icon className="w-6 h-6" />
                <span className="text-sm">{section.label}</span>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Profile Section */}
      {activeSection === 'profile' && (
        <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Profile Information</h3>
          
          {/* Profile Picture */}
          <div className="flex items-center space-x-6 mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div>
              <Button className="mb-2">
                <Camera className="w-4 h-4 mr-2" />
                Upload Photo
              </Button>
              <p className="text-sm text-gray-500">JPG, PNG max 2MB</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={profileData.name}
                onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email (Locked)</Label>
              <Input id="email" value={user?.email} disabled />
            </div>
            
            <div>
              <Label htmlFor="mobile">Mobile (Locked)</Label>
              <Input id="mobile" value={user?.mobile} disabled />
            </div>
            
            <div>
              <Label htmlFor="walletAddress">Wallet Address</Label>
              <Input
                id="walletAddress"
                value={profileData.walletAddress}
                onChange={(e) => setProfileData(prev => ({ ...prev, walletAddress: e.target.value }))}
                placeholder="Enter crypto wallet address"
              />
            </div>
          </div>

          {/* Password Change */}
          <div className="mt-8 pt-6 border-t">
            <h4 className="font-semibold mb-4">Change Password</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={profileData.currentPassword}
                  onChange={(e) => setProfileData(prev => ({ ...prev, currentPassword: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={profileData.newPassword}
                  onChange={(e) => setProfileData(prev => ({ ...prev, newPassword: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={profileData.confirmPassword}
                  onChange={(e) => setProfileData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                />
              </div>
            </div>
          </div>

          <Button onClick={handleProfileUpdate} className="mt-6">
            <Save className="w-4 h-4 mr-2" />
            Update Profile
          </Button>
        </div>
      )}

      {/* Shipping Address Section */}
      {activeSection === 'shipping' && (
        <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Shipping Address</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="shippingMobile">Mobile Number</Label>
              <Input
                id="shippingMobile"
                value={shippingData.mobile}
                onChange={(e) => setShippingData(prev => ({ ...prev, mobile: e.target.value }))}
              />
            </div>
            
            <div>
              <Label htmlFor="alternateMobile">Alternate Mobile</Label>
              <Input
                id="alternateMobile"
                value={shippingData.alternateMobile}
                onChange={(e) => setShippingData(prev => ({ ...prev, alternateMobile: e.target.value }))}
              />
            </div>
            
            <div className="md:col-span-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={shippingData.address}
                onChange={(e) => setShippingData(prev => ({ ...prev, address: e.target.value }))}
                placeholder="Enter full address"
              />
            </div>
            
            <div>
              <Label htmlFor="pincode">Pincode</Label>
              <Input
                id="pincode"
                value={shippingData.pincode}
                onChange={(e) => setShippingData(prev => ({ ...prev, pincode: e.target.value }))}
              />
            </div>
            
            <div>
              <Label htmlFor="landmark">Landmark</Label>
              <Input
                id="landmark"
                value={shippingData.landmark}
                onChange={(e) => setShippingData(prev => ({ ...prev, landmark: e.target.value }))}
              />
            </div>
            
            <div>
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                value={shippingData.state}
                onChange={(e) => setShippingData(prev => ({ ...prev, state: e.target.value }))}
              />
            </div>
            
            <div>
              <Label htmlFor="district">District</Label>
              <Input
                id="district"
                value={shippingData.district}
                onChange={(e) => setShippingData(prev => ({ ...prev, district: e.target.value }))}
              />
            </div>
          </div>

          <Button onClick={handleShippingUpdate} className="mt-6">
            <Save className="w-4 h-4 mr-2" />
            Save Address
          </Button>
        </div>
      )}

      {/* Bank Details Section */}
      {activeSection === 'bank' && (
        <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Bank Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="accountName">Account Holder Name</Label>
              <Input
                id="accountName"
                value={bankData.accountName}
                onChange={(e) => setBankData(prev => ({ ...prev, accountName: e.target.value }))}
              />
            </div>
            
            <div>
              <Label htmlFor="accountNumber">Account Number</Label>
              <Input
                id="accountNumber"
                value={bankData.accountNumber}
                onChange={(e) => setBankData(prev => ({ ...prev, accountNumber: e.target.value }))}
              />
            </div>
            
            <div>
              <Label htmlFor="ifsc">IFSC Code</Label>
              <Input
                id="ifsc"
                value={bankData.ifsc}
                onChange={(e) => setBankData(prev => ({ ...prev, ifsc: e.target.value }))}
              />
            </div>
            
            <div>
              <Label htmlFor="bankName">Bank Name</Label>
              <Input
                id="bankName"
                value={bankData.bankName}
                onChange={(e) => setBankData(prev => ({ ...prev, bankName: e.target.value }))}
              />
            </div>
            
            <div className="md:col-span-2">
              <Label htmlFor="branch">Branch</Label>
              <Input
                id="branch"
                value={bankData.branch}
                onChange={(e) => setBankData(prev => ({ ...prev, branch: e.target.value }))}
              />
            </div>
          </div>

          <Button onClick={handleBankUpdate} className="mt-6">
            <Save className="w-4 h-4 mr-2" />
            Save Bank Details
          </Button>
        </div>
      )}

      {/* KYC Section */}
      {activeSection === 'kyc' && (
        <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800">KYC Verification</h3>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              kycStatus === 'approved' ? 'bg-green-100 text-green-800' :
              kycStatus === 'rejected' ? 'bg-red-100 text-red-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              {kycStatus === 'approved' ? 'Verified' : 
               kycStatus === 'rejected' ? 'Rejected' : 'Pending'}
            </span>
          </div>

          {kycStatus === 'pending' && (
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-6">
              <div className="flex items-start space-x-2">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-yellow-800">KYC Under Review</h4>
                  <p className="text-sm text-yellow-700">
                    Your documents are being reviewed. This process may take 2-3 business days.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="panNumber">PAN Number</Label>
              <Input
                id="panNumber"
                value={kycData.panNumber}
                onChange={(e) => setKycData(prev => ({ ...prev, panNumber: e.target.value }))}
                placeholder="ABCDE1234F"
                disabled={kycStatus === 'approved'}
              />
            </div>
            
            <div>
              <Label htmlFor="aadhaarNumber">Aadhaar Number</Label>
              <Input
                id="aadhaarNumber"
                value={kycData.aadhaarNumber}
                onChange={(e) => setKycData(prev => ({ ...prev, aadhaarNumber: e.target.value }))}
                placeholder="1234 5678 9012"
                disabled={kycStatus === 'approved'}
              />
            </div>
          </div>

          {/* Document Upload */}
          <div className="mt-6">
            <h4 className="font-semibold mb-4">Document Upload</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>PAN Card</Label>
                <div className="space-y-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload('panFront', e.target.files?.[0] || null)}
                    disabled={kycStatus === 'approved'}
                  />
                  <p className="text-xs text-gray-500">Upload PAN card image</p>
                </div>
              </div>
              
              <div>
                <Label>Aadhaar Card</Label>
                <div className="space-y-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload('aadhaarFront', e.target.files?.[0] || null)}
                    disabled={kycStatus === 'approved'}
                  />
                  <p className="text-xs text-gray-500">Upload Aadhaar front</p>
                </div>
                <div className="space-y-2 mt-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload('aadhaarBack', e.target.files?.[0] || null)}
                    disabled={kycStatus === 'approved'}
                  />
                  <p className="text-xs text-gray-500">Upload Aadhaar back</p>
                </div>
              </div>
            </div>
          </div>

          {kycStatus !== 'approved' && (
            <Button onClick={handleKycSubmit} className="mt-6">
              <FileText className="w-4 h-4 mr-2" />
              Submit KYC Documents
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileTab;
