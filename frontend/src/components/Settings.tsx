import React, { useState } from 'react';
import {
  Settings,
  Shield,
  Bell,
  CreditCard,
  Globe,
  Moon,
  Sun,
  Smartphone,
  Mail,
  Eye,
  EyeOff,
  Sliders,
  LineChart,
  BarChart2,
  PieChart,
  Zap,
  BookOpen,
  MessageSquare,
  Volume2,
  Monitor,
  Palette
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const [showApiKey, setShowApiKey] = useState(false);

  return (
    <div className="space-y-6">
      {/* Settings Header */}
      <div className="bg-gray-900 rounded-lg p-6">
        <div className="flex items-center space-x-4">
          <Settings className="w-8 h-8 text-indigo-400" />
          <div>
            <h2 className="text-2xl font-bold text-white">Settings</h2>
            <p className="text-gray-400">Manage your account preferences</p>
          </div>
        </div>
      </div>

      {/* Trading Preferences */}
      <div className="bg-gray-900 rounded-lg p-6">
        <h3 className="text-lg font-medium text-white mb-4">Trading Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
            <div className="flex items-center space-x-3">
              <LineChart className="w-5 h-5 text-indigo-400" />
              <div>
                <p className="text-white">Default Chart Type</p>
                <p className="text-sm text-gray-400">Choose your preferred chart display</p>
              </div>
            </div>
            <select className="bg-gray-700 text-white rounded-md px-3 py-2">
              <option>Candlestick</option>
              <option>Line</option>
              <option>Area</option>
            </select>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
            <div className="flex items-center space-x-3">
              <BarChart2 className="w-5 h-5 text-indigo-400" />
              <div>
                <p className="text-white">Trading View Layout</p>
                <p className="text-sm text-gray-400">Configure your trading workspace</p>
              </div>
            </div>
            <select className="bg-gray-700 text-white rounded-md px-3 py-2">
              <option>Classic</option>
              <option>Advanced</option>
              <option>Custom</option>
            </select>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
            <div className="flex items-center space-x-3">
              <PieChart className="w-5 h-5 text-indigo-400" />
              <div>
                <p className="text-white">Risk Management</p>
                <p className="text-sm text-gray-400">Set default stop-loss percentage</p>
              </div>
            </div>
            <input
              type="number"
              className="bg-gray-700 text-white rounded-md px-3 py-2 w-24"
              defaultValue="2"
            />
          </div>
        </div>
      </div>

      {/* Learning Preferences */}
      <div className="bg-gray-900 rounded-lg p-6">
        <h3 className="text-lg font-medium text-white mb-4">Learning Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
            <div className="flex items-center space-x-3">
              <BookOpen className="w-5 h-5 text-indigo-400" />
              <div>
                <p className="text-white">Course Display</p>
                <p className="text-sm text-gray-400">Choose how courses are displayed</p>
              </div>
            </div>
            <select className="bg-gray-700 text-white rounded-md px-3 py-2">
              <option>Grid View</option>
              <option>List View</option>
              <option>Compact</option>
            </select>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
            <div className="flex items-center space-x-3">
              <Volume2 className="w-5 h-5 text-indigo-400" />
              <div>
                <p className="text-white">Video Playback</p>
                <p className="text-sm text-gray-400">Default video quality settings</p>
              </div>
            </div>
            <select className="bg-gray-700 text-white rounded-md px-3 py-2">
              <option>Auto</option>
              <option>720p</option>
              <option>1080p</option>
            </select>
          </div>
        </div>
      </div>

      {/* API Integration */}
      <div className="bg-gray-900 rounded-lg p-6">
        <h3 className="text-lg font-medium text-white mb-4">API Integration</h3>
        <div className="space-y-4">
          <div className="p-4 bg-gray-800 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Zap className="w-5 h-5 text-indigo-400" />
                <div>
                  <p className="text-white">API Key</p>
                  <p className="text-sm text-gray-400">Your unique API access key</p>
                </div>
              </div>
              <button
                onClick={() => setShowApiKey(!showApiKey)}
                className="text-indigo-400 hover:text-indigo-300"
              >
                {showApiKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type={showApiKey ? 'text' : 'password'}
                value="sk_live_51KjH2b..."
                className="flex-1 bg-gray-700 text-white rounded-md px-3 py-2"
                readOnly
              />
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                Generate New
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Appearance */}
      <div className="bg-gray-900 rounded-lg p-6">
        <h3 className="text-lg font-medium text-white mb-4">Appearance</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
            <div className="flex items-center space-x-3">
              <Palette className="w-5 h-5 text-indigo-400" />
              <div>
                <p className="text-white">Color Theme</p>
                <p className="text-sm text-gray-400">Choose your interface theme</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 bg-gray-700 rounded-md">
                <Sun className="w-5 h-5 text-gray-400" />
              </button>
              <button className="p-2 bg-indigo-600 rounded-md">
                <Moon className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
            <div className="flex items-center space-x-3">
              <Monitor className="w-5 h-5 text-indigo-400" />
              <div>
                <p className="text-white">Layout Density</p>
                <p className="text-sm text-gray-400">Adjust the spacing of elements</p>
              </div>
            </div>
            <select className="bg-gray-700 text-white rounded-md px-3 py-2">
              <option>Comfortable</option>
              <option>Compact</option>
              <option>Relaxed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-gray-900 rounded-lg p-6">
        <h3 className="text-lg font-medium text-white mb-4">Notification Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
            <div className="flex items-center space-x-3">
              <Bell className="w-5 h-5 text-indigo-400" />
              <div>
                <p className="text-white">Price Alerts</p>
                <p className="text-sm text-gray-400">Get notified about price movements</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
            <div className="flex items-center space-x-3">
              <MessageSquare className="w-5 h-5 text-indigo-400" />
              <div>
                <p className="text-white">Chat Notifications</p>
                <p className="text-sm text-gray-400">Receive chat and message alerts</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="bg-gray-900 rounded-lg p-6">
        <h3 className="text-lg font-medium text-white mb-4">Security Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-indigo-400" />
              <div>
                <p className="text-white">Two-Factor Authentication</p>
                <p className="text-sm text-gray-400">Add an extra layer of security</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
              Enable
            </button>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
            <div className="flex items-center space-x-3">
              <CreditCard className="w-5 h-5 text-indigo-400" />
              <div>
                <p className="text-white">Trading Password</p>
                <p className="text-sm text-gray-400">Separate password for trades</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600">
              Change
            </button>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-gray-900 rounded-lg p-6">
        <h3 className="text-lg font-medium text-red-500 mb-4">Danger Zone</h3>
        <div className="space-y-4">
          <div className="border border-red-500/20 rounded-lg p-4">
            <h4 className="text-white mb-2">Delete Account</h4>
            <p className="text-gray-400 text-sm mb-4">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};