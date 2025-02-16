import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { BookOpen, LineChart, TrendingUp, PieChart, BarChart } from "lucide-react";

interface Course {
  _id: string;
  title: string;
  status: string;
  progress: number;
  assessments: number;
  practiceTest: string;
  startDate: string;
  endDate: string;
  description: string;
  videoUrl: string;
  materials: string[];
}

const backendURL = "http://localhost:5000";

export const CourseDetails = () => {
  const { courseId } = useParams(); // Extract courseId from URL
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log("Extracted Course ID:", courseId); // Debugging

    if (!courseId) {
      console.error("Course ID is missing!");
      return;
    }

    const fetchCourse = async () => {
      try {
        const response = await fetch(`${backendURL}/courses/find/${courseId}`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setCourse(data);
      } catch (error) {
        console.error("Error fetching course details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  const getCourseIcon = (title: string) => {
    if (title.toLowerCase().includes("basics")) return <BookOpen className="w-8 h-8 text-blue-600" />;
    if (title.toLowerCase().includes("technical")) return <LineChart className="w-8 h-8 text-green-600" />;
    if (title.toLowerCase().includes("advanced")) return <TrendingUp className="w-8 h-8 text-purple-600" />;
    if (title.toLowerCase().includes("options")) return <PieChart className="w-8 h-8 text-yellow-600" />;
    if (title.toLowerCase().includes("fundamental")) return <BarChart className="w-8 h-8 text-red-600" />;
    return <BookOpen className="w-8 h-8 text-gray-500" />;
  };

  if (loading) {
    return <p className="text-center mt-4 text-gray-600">Loading...</p>;
  }

  if (!course) {
    return <p className="text-center mt-4 text-red-600">Course not found</p>;
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-lg rounded-xl p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">{course.title}</h1>
        <div>{getCourseIcon(course.title)}</div>

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

        {/* Course Materials */}
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
