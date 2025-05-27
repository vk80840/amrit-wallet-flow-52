
import { useState } from 'react';
import { Save, Upload, Download, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const SystemSettings = () => {
  const [settings, setSettings] = useState({
    // Commission Settings
    level1Commission: 10,
    level2Commission: 5,
    level3Commission: 3,
    level4Commission: 2,
    level5Commission: 1,
    
    // GST Settings
    gstRate: 18,
    
    // Withdrawal Settings
    minWithdrawalAmount: 500,
    maxWithdrawalAmount: 50000,
    withdrawalProcessingFee: 2.5,
    
    // Registration Settings
    allowNewRegistrations: true,
    kycMandatory: true,
    
    // STK Settings
    stkPrice: 0.50,
    maxStkPerUser: 10000,
    
    // General Settings
    systemName: 'AlkalineAmrit',
    supportEmail: 'support@alkalineamrit.com',
    supportPhone: '+91-9999999999',
    
    // File Settings
    logo: null,
    favicon: null
  });

  const [activeTab, setActiveTab] = useState('commission');

  const handleSave = () => {
    console.log('Saving settings:', settings);
    alert('Settings saved successfully!');
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all settings to default?')) {
      console.log('Resetting settings...');
    }
  };

  const handleFileUpload = (type, event) => {
    const file = event.target.files[0];
    if (file) {
      setSettings(prev => ({ ...prev, [type]: file }));
    }
  };

  const exportSettings = () => {
    const settingsData = JSON.stringify(settings, null, 2);
    const blob = new Blob([settingsData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'system-settings.json';
    a.click();
  };

  const tabs = [
    { id: 'commission', label: 'Commission Rates' },
    { id: 'financial', label: 'Financial Settings' },
    { id: 'user', label: 'User Settings' },
    { id: 'stk', label: 'STK Settings' },
    { id: 'general', label: 'General Settings' },
    { id: 'branding', label: 'Branding' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">System Settings</h1>
        <div className="flex space-x-2">
          <Button onClick={exportSettings} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button onClick={handleReset} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Save All
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-6">
        <div className="flex space-x-2 mb-6 overflow-x-auto">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab(tab.id)}
              className="whitespace-nowrap"
            >
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Commission Rates Tab */}
        {activeTab === 'commission' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Referral Commission Rates (%)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5].map((level) => (
                <div key={level}>
                  <Label htmlFor={`level${level}`}>Level {level} Commission (%)</Label>
                  <Input
                    id={`level${level}`}
                    type="number"
                    step="0.1"
                    value={settings[`level${level}Commission`]}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      [`level${level}Commission`]: parseFloat(e.target.value)
                    }))}
                  />
                </div>
              ))}
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800">Commission Structure</h4>
              <p className="text-sm text-blue-700">
                These percentages apply to the product BV when users in your downline make purchases.
                Total commission pool: {Object.keys(settings)
                  .filter(key => key.includes('Commission'))
                  .reduce((sum, key) => sum + settings[key], 0)}%
              </p>
            </div>
          </div>
        )}

        {/* Financial Settings Tab */}
        {activeTab === 'financial' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Financial Configuration</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="gstRate">GST Rate (%)</Label>
                <Input
                  id="gstRate"
                  type="number"
                  step="0.1"
                  value={settings.gstRate}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    gstRate: parseFloat(e.target.value)
                  }))}
                />
              </div>
              
              <div>
                <Label htmlFor="withdrawalFee">Withdrawal Processing Fee (%)</Label>
                <Input
                  id="withdrawalFee"
                  type="number"
                  step="0.1"
                  value={settings.withdrawalProcessingFee}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    withdrawalProcessingFee: parseFloat(e.target.value)
                  }))}
                />
              </div>
              
              <div>
                <Label htmlFor="minWithdrawal">Minimum Withdrawal Amount (₹)</Label>
                <Input
                  id="minWithdrawal"
                  type="number"
                  value={settings.minWithdrawalAmount}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    minWithdrawalAmount: parseInt(e.target.value)
                  }))}
                />
              </div>
              
              <div>
                <Label htmlFor="maxWithdrawal">Maximum Withdrawal Amount (₹)</Label>
                <Input
                  id="maxWithdrawal"
                  type="number"
                  value={settings.maxWithdrawalAmount}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    maxWithdrawalAmount: parseInt(e.target.value)
                  }))}
                />
              </div>
            </div>
          </div>
        )}

        {/* User Settings Tab */}
        {activeTab === 'user' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">User Management Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="allowRegistrations"
                  checked={settings.allowNewRegistrations}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    allowNewRegistrations: e.target.checked
                  }))}
                />
                <Label htmlFor="allowRegistrations">Allow New User Registrations</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="kycMandatory"
                  checked={settings.kycMandatory}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    kycMandatory: e.target.checked
                  }))}
                />
                <Label htmlFor="kycMandatory">Make KYC Verification Mandatory</Label>
              </div>
            </div>
          </div>
        )}

        {/* STK Settings Tab */}
        {activeTab === 'stk' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">STK Token Configuration</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="stkPrice">STK Price (₹)</Label>
                <Input
                  id="stkPrice"
                  type="number"
                  step="0.01"
                  value={settings.stkPrice}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    stkPrice: parseFloat(e.target.value)
                  }))}
                />
              </div>
              
              <div>
                <Label htmlFor="maxStk">Maximum STK per User</Label>
                <Input
                  id="maxStk"
                  type="number"
                  value={settings.maxStkPerUser}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    maxStkPerUser: parseInt(e.target.value)
                  }))}
                />
              </div>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-semibold text-yellow-800">STK Supply Information</h4>
              <p className="text-sm text-yellow-700">
                Total Supply: 1,000,000 STK<br/>
                Distributed: 150,000 STK (15%)<br/>
                Remaining: 850,000 STK (85%)
              </p>
            </div>
          </div>
        )}

        {/* General Settings Tab */}
        {activeTab === 'general' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">General System Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="systemName">System Name</Label>
                <Input
                  id="systemName"
                  value={settings.systemName}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    systemName: e.target.value
                  }))}
                />
              </div>
              
              <div>
                <Label htmlFor="supportEmail">Support Email</Label>
                <Input
                  id="supportEmail"
                  type="email"
                  value={settings.supportEmail}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    supportEmail: e.target.value
                  }))}
                />
              </div>
              
              <div>
                <Label htmlFor="supportPhone">Support Phone</Label>
                <Input
                  id="supportPhone"
                  value={settings.supportPhone}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    supportPhone: e.target.value
                  }))}
                />
              </div>
            </div>
          </div>
        )}

        {/* Branding Tab */}
        {activeTab === 'branding' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Branding & Logo Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="logo">System Logo</Label>
                <div className="mt-2">
                  <input
                    type="file"
                    id="logo"
                    accept="image/*"
                    onChange={(e) => handleFileUpload('logo', e)}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  {settings.logo && (
                    <p className="text-sm text-green-600 mt-2">
                      ✓ Logo uploaded: {settings.logo.name}
                    </p>
                  )}
                </div>
              </div>
              
              <div>
                <Label htmlFor="favicon">Favicon</Label>
                <div className="mt-2">
                  <input
                    type="file"
                    id="favicon"
                    accept="image/*"
                    onChange={(e) => handleFileUpload('favicon', e)}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  {settings.favicon && (
                    <p className="text-sm text-green-600 mt-2">
                      ✓ Favicon uploaded: {settings.favicon.name}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} size="lg">
          <Save className="w-4 h-4 mr-2" />
          Save All Settings
        </Button>
      </div>
    </div>
  );
};

export default SystemSettings;
