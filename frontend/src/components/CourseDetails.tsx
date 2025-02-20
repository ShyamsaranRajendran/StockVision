import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { BookOpen, LineChart, TrendingUp, PieChart, BarChart } from "lucide-react";

interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  category: string;
  level: string;
  duration: string;
  startDate: string;
  endDate: string;
  language: string;
  certificate: boolean;
  views: number;
  likes: number;
  dislikes: number;
  enrollments: number;
  completionRate: number;
  ratings: number;
  reviews: { user: string; comment: string; rating: number }[];
  shareCount: number;
  shareLinks: { platform: string; url: string }[];
  modules: { title: string; lessons: number }[];
  materials: string[];
  quizzes: number;
  practiceTests: string;
  projects: string[];
  videoUrl: string;
  thumbnail: string;
  trailer: string;
  progress: number;
  completedLessons: number;
  timeSpent: string;
  price: number;
  discount: number;
  paymentOptions: string[];
  enrollmentStatus: string;
  refundPolicy: string;
  discussionForum: string;
  comments: { user: string; comment: string }[];
  liveSessions: { date: string; topic: string }[];
  badges: string[];
  certificates: string[];
  leaderboard: { user: string; rank: number }[];
  platform: string;
  requirements: string[];
  compatibility: string[];
  faq: { question: string; answer: string }[];
}

const backendURL = "http://localhost:5000";

export const CourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!courseId) {
      console.error("Course ID is missing!");
      return;
    }

    const fetchCourse = async () => {
      try {
        const response = await fetch(`${backendURL}/courses/find/${courseId}`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        
        let embedUrl = null;
        if (data.videoUrl) {
          const videoId = data.videoUrl.split("v=")[1]?.split("&")[0]; // Extract Video ID
          embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : null;
        }
    
        setCourse({
          ...data,
          materials: data.materials || [],
          videoUrl: embedUrl, // Store converted embed URL
        });
      } catch (error) {
        console.error("Error fetching course details:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCourse();
  }, [courseId]);

  if (loading) {
    return <p className="text-center mt-4 text-gray-600">Loading...</p>;
  }

  if (!course) {
    return <p className="text-center mt-4 text-red-600">Course not found</p>;
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-lg rounded-xl p-6 max-w-4xl mx-auto">
        {/* Course Title */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">{course.title}</h1>

        {/* Thumbnail */}
        <img src={course.thumbnail} alt={course.title} className="w-full h-48 object-cover rounded-lg mb-6" />

        {/* YouTube Video */}
        <div className="aspect-w-16 aspect-h-9 mb-6">
          <iframe
            src={course.videoUrl}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full rounded-lg"
          ></iframe>
        </div>

        {/* Course Description */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Description</h2>
          <p className="text-gray-600">{course.description}</p>
        </div>

        {/* Instructor */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Instructor</h2>
          <p className="text-gray-600">{course.instructor}</p>
        </div>

        {/* Engagement Metrics */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Engagement</h2>
          <div className="flex space-x-4 text-gray-600">
            <span>👁️ {course.views} Views</span>
            <span>👍 {course.likes} Likes</span>
            <span>👎 {course.dislikes} Dislikes</span>
            <span>🎓 {course.enrollments} Enrollments</span>
            <span>⭐ {course.ratings}/5 Ratings</span>
          </div>
        </div>

        {/* Share Links */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Share</h2>
          <div className="flex space-x-4">
            {course.shareLinks.map((link, index) => (
              <a key={index} href={link.url} className="text-blue-600 hover:underline">
                {link.platform}
              </a>
            ))}
          </div>
        </div>

        {/* Course Content */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Course Content</h2>
          <ul className="list-disc list-inside text-gray-600">
            {course.modules.map((module, index) => (
              <li key={index}>
                {module.title} ({module.lessons} lessons)
              </li>
            ))}
          </ul>
        </div>

        {/* Materials */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Materials</h2>
          <ul className="list-disc list-inside text-gray-600">
            {course.materials.map((material, index) => (
              <li key={index}>{material}</li>
            ))}
          </ul>
        </div>

        {/* Progress and Dates */}
        <div className="flex justify-between text-sm text-gray-600">
          <span>📅 {course.startDate} - {course.endDate}</span>
          <span>📊 Progress: {course.progress}%</span>
        </div>
      </div>
    </div>
  );
};
