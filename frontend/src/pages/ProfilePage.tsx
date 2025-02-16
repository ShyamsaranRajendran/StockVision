import React from 'react';
import {
  User,
  Mail,
  Phone,
  Shield,
  CreditCard,
  Bell,
  Award,
  BookOpen,
  TrendingUp,
  Clock,
  Star,
  Briefcase,
  MapPin,
  Calendar,
  FileText,
  Globe,
  GraduationCap
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const achievements = [
    {
      title: 'Trading Pro',
      description: 'Completed 100+ successful trades',
      icon: TrendingUp,
      date: '2024-02-15',
    },
    {
      title: 'Market Master',
      description: 'Finished all beginner courses',
      icon: GraduationCap,
      date: '2024-01-20',
    },
    {
      title: 'Analysis Expert',
      description: 'Achieved 90% accuracy in technical analysis',
      icon: Star,
      date: '2024-03-01',
    },
  ];

  const certifications = [
    {
      name: 'Technical Analysis Fundamentals',
      issuer: 'StockVision Academy',
      date: '2024-02-01',
      credential: 'TA-2024-001',
    },
    {
      name: 'Options Trading Specialist',
      issuer: 'Global Trading Institute',
      date: '2024-01-15',
      credential: 'OTS-2024-052',
    },
  ];

  const tradingStats = {
    totalTrades: 156,
    successRate: 72,
    avgReturn: 15.8,
    bestTrade: 45.2,
    tradingDays: 89,
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-gray-900 rounded-lg p-6">
        <div className="flex items-center space-x-6">
          <div className="w-24 h-24 bg-indigo-600 rounded-full flex items-center justify-center">
            <User className="w-12 h-12 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">John Doe</h2>
                <p className="text-indigo-400">Premium Member</p>
              </div>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                Edit Profile
              </button>
            </div>
            <div className="mt-4 flex items-center space-x-4">
              <div className="flex items-center text-gray-400">
                <MapPin className="w-4 h-4 mr-1" />
                <span>New York, USA</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Calendar className="w-4 h-4 mr-1" />
                <span>Member since Jan 2024</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Globe className="w-4 h-4 mr-1" />
                <span>English, Spanish</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trading Statistics */}
      <div className="bg-gray-900 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Trading Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-gray-400 text-sm">Total Trades</p>
            <p className="text-2xl font-bold text-white">{tradingStats.totalTrades}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-gray-400 text-sm">Success Rate</p>
            <p className="text-2xl font-bold text-green-500">{tradingStats.successRate}%</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-gray-400 text-sm">Avg. Return</p>
            <p className="text-2xl font-bold text-indigo-500">+{tradingStats.avgReturn}%</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-gray-400 text-sm">Best Trade</p>
            <p className="text-2xl font-bold text-green-500">+{tradingStats.bestTrade}%</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-gray-400 text-sm">Trading Days</p>
            <p className="text-2xl font-bold text-white">{tradingStats.tradingDays}</p>
          </div>
        </div>
      </div>

      {/* Learning Progress & Certifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Learning Progress */}
        <div className="bg-gray-900 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-white">Learning Progress</h3>
            <GraduationCap className="w-6 h-6 text-indigo-500" />
          </div>
          <div className="space-y-4">
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white">Technical Analysis</span>
                <span className="text-indigo-400">85%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '85%' }} />
              </div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white">Fundamental Analysis</span>
                <span className="text-indigo-400">70%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '70%' }} />
              </div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white">Risk Management</span>
                <span className="text-indigo-400">90%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '90%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="bg-gray-900 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-white">Certifications</h3>
            <Award className="w-6 h-6 text-yellow-500" />
          </div>
          <div className="space-y-4">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-white font-medium">{cert.name}</h4>
                    <p className="text-gray-400 text-sm">{cert.issuer}</p>
                    <p className="text-gray-400 text-sm mt-1">
                      Issued: {new Date(cert.date).toLocaleDateString()}
                    </p>
                  </div>
                  <button className="text-indigo-400 hover:text-indigo-300 text-sm">
                    View Certificate
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-gray-900 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <div key={index} className="bg-gray-800 p-4 rounded-lg">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-indigo-600/20 rounded-lg">
                    <Icon className="w-6 h-6 text-indigo-500" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{achievement.title}</h4>
                    <p className="text-gray-400 text-sm mt-1">{achievement.description}</p>
                    <p className="text-gray-500 text-sm mt-2">
                      {new Date(achievement.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Account Information */}
      <div className="bg-gray-900 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Account Information</h3>
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
    </div>
  );
};