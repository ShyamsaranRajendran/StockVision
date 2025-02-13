import React from 'react';
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
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Settings Header */}
      <div className="bg-gray-900 rounded-lg p-6">
        <div className="flex items-center space-x-4">
          <Settings className="w-6 h-6 text-indigo-400" />
          <h2 className="text-xl font-semibold text-white">Settings</h2>
        </div>
      </div>

      {/* Account Settings */}
      <div className="bg-gray-900 rounded-lg p-6">
        <h3 className="text-lg font-medium text-white mb-4">Account Settings</h3>
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
                <p className="text-white">Payment Methods</p>
                <p className="text-sm text-gray-400">Manage your payment options</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600">
              Manage
            </button>
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-gray-900 rounded-lg p-6">
        <h3 className="text-lg font-medium text-white mb-4">Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
            <div className="flex items-center space-x-3">
              <Globe className="w-5 h-5 text-indigo-400" />
              <div>
                <p className="text-white">Language</p>
                <p className="text-sm text-gray-400">Choose your preferred language</p>
              </div>
            </div>
            <select className="bg-gray-700 text-white rounded-md px-3 py-2">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
            <div className="flex items-center space-x-3">
              <Moon className="w-5 h-5 text-indigo-400" />
              <div>
                <p className="text-white">Theme</p>
                <p className="text-sm text-gray-400">Choose your preferred theme</p>
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
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-gray-900 rounded-lg p-6">
        <h3 className="text-lg font-medium text-white mb-4">Notification Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-indigo-400" />
              <div>
                <p className="text-white">Email Notifications</p>
                <p className="text-sm text-gray-400">Receive updates via email</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
            <div className="flex items-center space-x-3">
              <Smartphone className="w-5 h-5 text-indigo-400" />
              <div>
                <p className="text-white">Push Notifications</p>
                <p className="text-sm text-gray-400">Get instant updates on your device</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
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