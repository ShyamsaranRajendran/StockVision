import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Play, 
  Award, 
  TrendingUp, 
  Users, 
  Star,
  Clock,
  CheckCircle,
  BarChart2,
  BookMarked,
  Video,
  FileText
} from 'lucide-react';

const courses = [
  {
    id: 1,
    title: 'Stock Market Fundamentals',
    level: 'Beginner',
    duration: '4 weeks',
    lessons: 12,
    students: 1543,
    rating: 4.8,
    progress: 35,
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 2,
    title: 'Technical Analysis Mastery',
    level: 'Intermediate',
    duration: '6 weeks',
    lessons: 18,
    students: 982,
    rating: 4.9,
    progress: 0,
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 3,
    title: 'Advanced Trading Strategies',
    level: 'Advanced',
    duration: '8 weeks',
    lessons: 24,
    students: 756,
    rating: 4.7,
    progress: 0,
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=400',
  },
];

const upcomingWebinars = [
  {
    id: 1,
    title: 'Market Analysis for Week Ahead',
    speaker: 'Sarah Johnson',
    date: '2024-03-20T18:00:00',
    duration: '1 hour',
    attendees: 234,
  },
  {
    id: 2,
    title: 'Options Trading Masterclass',
    speaker: 'Michael Chen',
    date: '2024-03-22T17:00:00',
    duration: '2 hours',
    attendees: 156,
  },
];

const leaderboard = [
  {
    rank: 1,
    name: 'Alex Thompson',
    returns: 32.5,
    trades: 145,
    accuracy: 78,
  },
  {
    rank: 2,
    name: 'Maria Garcia',
    returns: 28.7,
    trades: 98,
    accuracy: 82,
  },
  {
    rank: 3,
    name: 'James Wilson',
    returns: 25.4,
    trades: 167,
    accuracy: 71,
  },
];

export const LearningPage: React.FC = () => {
    const navigate = useNavigate();
  return (
    <div className="space-y-6 container mx-auto">
      {/* Learning Dashboard Header */}
      <div className="bg-gray-900 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <BookOpen className="w-8 h-8 text-indigo-500" />
            <div>
              <h2 className="text-2xl font-bold text-white">Learning Center</h2>
              <p className="text-gray-400">Master the art of trading</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700" onClick={()=> navigate("/learning/courses")}>
            View All Courses
          </button>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Courses Enrolled</p>
                <p className="text-2xl font-bold text-white">3</p>
              </div>
              <BookMarked className="w-8 h-8 text-indigo-500" />
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Hours Learned</p>
                <p className="text-2xl font-bold text-white">24.5</p>
              </div>
              <Clock className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Certificates</p>
                <p className="text-2xl font-bold text-white">2</p>
              </div>
              <Award className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Quiz Score</p>
                <p className="text-2xl font-bold text-white">85%</p>
              </div>
              <CheckCircle className="w-8 h-8 text-blue-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Current Courses */}
      <div className="bg-gray-900 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Your Courses</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="bg-gray-800 rounded-lg overflow-hidden">
              <img 
                src={course.image} 
                alt={course.title} 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-1 bg-indigo-600/20 text-indigo-400 text-sm rounded">
                    {course.level}
                  </span>
                  <div className="flex items-center text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="ml-1 text-sm">{course.rating}</span>
                  </div>
                </div>
                <h4 className="text-lg font-medium text-white mb-2">{course.title}</h4>
                <div className="flex items-center text-gray-400 text-sm mb-3">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{course.duration}</span>
                  <span className="mx-2">•</span>
                  <BookOpen className="w-4 h-4 mr-1" />
                  <span>{course.lessons} lessons</span>
                </div>
                {course.progress > 0 && (
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Progress</span>
                      <span className="text-white">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-indigo-600 h-2 rounded-full"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                )}
                <button className="w-full mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                  {course.progress > 0 ? 'Continue Learning' : 'Start Course'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Webinars */}
      <div className="bg-gray-900 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Upcoming Webinars</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {upcomingWebinars.map((webinar) => (
            <div key={webinar.id} className="bg-gray-800 p-4 rounded-lg">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-lg font-medium text-white mb-2">{webinar.title}</h4>
                  <p className="text-gray-400 text-sm mb-2">by {webinar.speaker}</p>
                  <div className="flex items-center text-sm text-gray-400">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{new Date(webinar.date).toLocaleString()}</span>
                    <span className="mx-2">•</span>
                    <Users className="w-4 h-4 mr-1" />
                    <span>{webinar.attendees} attending</span>
                  </div>
                </div>
                <Video className="w-6 h-6 text-indigo-500" />
              </div>
              <button className="w-full mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                Register Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Paper Trading & Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Paper Trading */}
        <div className="bg-gray-900 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-white">Paper Trading</h3>
            <BarChart2 className="w-6 h-6 text-indigo-500" />
          </div>
          <div className="bg-gray-800 rounded-lg p-4 mb-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400 text-sm">Virtual Balance</p>
                <p className="text-2xl font-bold text-white">$100,000</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">P/L</p>
                <p className="text-2xl font-bold text-green-500">+$5,234</p>
              </div>
            </div>
          </div>
          <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
            Start Trading
          </button>
        </div>

        {/* Leaderboard */}
        <div className="bg-gray-900 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-white">Top Performers</h3>
            <TrendingUp className="w-6 h-6 text-green-500" />
          </div>
          <div className="space-y-4">
            {leaderboard.map((trader) => (
              <div key={trader.rank} className="bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      trader.rank === 1 ? 'bg-yellow-500' :
                      trader.rank === 2 ? 'bg-gray-400' :
                      'bg-yellow-700'
                    }`}>
                      <span className="text-gray-900 font-bold">{trader.rank}</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">{trader.name}</p>
                      <p className="text-sm text-gray-400">
                        {trader.trades} trades • {trader.accuracy}% accuracy
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-green-500 font-bold">+{trader.returns}%</p>
                    <p className="text-sm text-gray-400">Returns</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-gray-900 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Quick Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center space-x-3 p-4 bg-gray-800 rounded-lg hover:bg-gray-700">
            <FileText className="w-6 h-6 text-indigo-500" />
            <span className="text-white">Stock Market Glossary</span>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-gray-800 rounded-lg hover:bg-gray-700">
            <Video className="w-6 h-6 text-indigo-500" />
            <span className="text-white">Video Tutorials</span>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-gray-800 rounded-lg hover:bg-gray-700">
            <Users className="w-6 h-6 text-indigo-500" />
            <span className="text-white">Community Forum</span>
          </button>
        </div>
      </div>
    </div>
  );
};