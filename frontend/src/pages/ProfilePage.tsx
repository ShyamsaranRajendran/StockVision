import { div } from 'framer-motion/client';
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

import {
  User,
  Shield,
  CreditCard,
  Bell,
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const [profilePic, setProfilePic] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setProfilePic(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });


 const  name="Shyam Kumar"
 const     pic="https://via.placeholder.com/150"
 const     about="Full Stack Developer | React & Node.js Enthusiast"
  const    date="August 12, 2024"
  return (
    <div className='grid grid-cols-4 gap-4 items-start py-8'>
       <div className="col-span-3 space-y-6 py-8">
      {/* Profile Header */}
      <div className="bg-gray-900 rounded-lg p-6 relative">
  <button className="absolute top-4 right-4 bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1 rounded-md text-sm">
    Edit
  </button>
  <div className="flex items-center space-x-4">
    <div
      {...getRootProps()}
      className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center cursor-pointer border-2 border-dashed border-gray-500 hover:border-indigo-400"
    >
      <input {...getInputProps()} />
      {profilePic ? (
        <img
          src={profilePic}
          alt="Profile"
          className="w-full h-full object-cover rounded-full"
        />
      ) : (
        <User className="w-10 h-10 text-white" />
      )}
    </div>
    <div>
      <h2 className="text-2xl font-bold text-white">John Doe</h2>
      <p className="text-gray-400">Premium Member</p>
    </div>
  </div>
</div>


      {/* KYC Status */}
      <div className="bg-gray-900 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-4">KYC Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Identity Verification</span>
              <span className="text-green-500">Verified</span>
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Address Proof</span>
              <span className="text-green-500">Verified</span>
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Bank Account</span>
              <span className="text-yellow-500">Pending</span>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-gray-900 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-4">
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value="John Doe"
              className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-white"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Email
            </label>
            <input
              type="email"
              value="john.doe@example.com"
              className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-white"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Phone
            </label>
            <input
              type="tel"
              value="+1 234 567 8900"
              className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-white"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Date of Birth
            </label>
            <input
              type="text"
              value="15 Jan 1990"
              className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-white"
              readOnly
            />
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-gray-900 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-4">
          Security Settings
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
            <div className="flex items-center space-x-3">
              <Shield className="w-6 h-6 text-indigo-500" />
              <div>
                <p className="text-white">Two-Factor Authentication</p>
                <p className="text-sm text-gray-400">
                  Add an extra layer of security
                </p>
              </div>
            </div>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
              Enable
            </button>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
            <div className="flex items-center space-x-3">
              <CreditCard className="w-6 h-6 text-indigo-500" />
              <div>
                <p className="text-white">Payment Methods</p>
                <p className="text-sm text-gray-400">
                  Manage your payment options
                </p>
              </div>
            </div>
            <button className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600">
              Manage
            </button>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
            <div className="flex items-center space-x-3">
              <Bell className="w-6 h-6 text-indigo-500" />
              <div>
                <p className="text-white">Notifications</p>
                <p className="text-sm text-gray-400">
                  Configure alert preferences
                </p>
              </div>
            </div>
            <button className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600">
              Settings
            </button>
          </div>
        </div>
      </div>
    </div>
    <div className='col-span-1 flex items-center justify-start'>
    <div className="flex items-center py-8">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-80 text-center">
        <img
          src={pic}
          alt={name}
          className="w-24 h-24 mx-auto rounded-full border-4 border-blue-500 shadow-md"
        />
        <h2 className="mt-4 text-xl font-semibold text-gray-800">{name}</h2>
        <p className="text-sm text-gray-500">{about}</p>
        <p className="mt-2 text-xs text-gray-400">Joined: {date}</p>
      </div>
    </div>


    </div>

    </div>
  );
};