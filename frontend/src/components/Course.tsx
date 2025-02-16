import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
}

const backendURL = "http://localhost:5000"; // Adjust the URL if needed

const CourseCard = ({ course }: { course: Course }) => {
  const navigate = useNavigate();

  const handleStartCourse = () => {
    navigate(`/learning/course/${course._id}`);
  };

  // Assign icons dynamically based on course title
  const getCourseIcon = (title: string) => {
    if (title.toLowerCase().includes("basics")) return <BookOpen className="w-8 h-8 text-blue-600" />;
    if (title.toLowerCase().includes("technical")) return <LineChart className="w-8 h-8 text-green-600" />;
    if (title.toLowerCase().includes("advanced")) return <TrendingUp className="w-8 h-8 text-purple-600" />;
    if (title.toLowerCase().includes("options")) return <PieChart className="w-8 h-8 text-yellow-600" />;
    if (title.toLowerCase().includes("fundamental")) return <BarChart className="w-8 h-8 text-red-600" />;
    return <BookOpen className="w-8 h-8 text-gray-500" />; // Default icon
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-4 w-[300px] flex flex-col justify-between">
      <div>
        <div>{getCourseIcon(course.title)}</div>
        <h3 className="font-semibold text-gray-800 truncate">{course.title}</h3>
        <p className="text-sm text-gray-500">{course.status}</p>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
          <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${course.progress}%` }}></div>
        </div>

        {/* Assessments and Practice Test */}
        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <span>📄 {course.assessments} Assessment</span>
          <span>📝 {course.practiceTest} Practice Test</span>
        </div>

        {/* Dates */}
        <div className="text-xs text-gray-500 mt-2">
          📅 {course.startDate} - {course.endDate}
        </div>
      </div>

      {/* Start Button */}
      <button
        onClick={handleStartCourse}
        className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
      >
        Start
      </button>
    </div>
  );
};

export const Course = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${backendURL}/courses`);
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="flex p-8 bg-gray-100 min-h-screen">
      <div className="w-full max-w-6xl mx-auto">
        <h2 className="text-xl font-semibold text-gray-800">My Courses</h2>

        {loading ? (
          <p className="text-center mt-4 text-gray-600">Loading...</p>
        ) : (
          <div className="grid grid-cols-3 gap-2 mt-2">
            {courses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
