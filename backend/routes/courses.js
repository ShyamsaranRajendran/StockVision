const express = require('express');
const router = express.Router();
const Course = require('../models/course.model');

// Route to get all courses
router.get('/', async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ message: 'Error fetching courses' });
    }
});
// https://youtu.be/slBxM4J3BEA?si=vM64j7G0gd64PscU
// Route to get course by ID
router.get('/find/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.json(course);
    } catch (error) {
        console.error('Error fetching course by ID:', error);
        res.status(500).json({ message: 'Error fetching course by ID' });
    }
});

// Route to add a new course
router.post("/add", async (req, res) => {
    try {
      const { title, status, progress, assessments, practiceTest, startDate, endDate, icon } = req.body;
  
      const newCourse = new Course({
        title,
        status,
        progress,
        assessments,
        practiceTest,
        startDate,
        endDate,
        icon,
      });
  
      await newCourse.save();
      res.status(201).json({ message: "Course added successfully", course: newCourse });
    } catch (error) {
        console.log(error)
      res.status(500).json({ message: "Error adding course", error });
    }
  });
  

// Route to update course by ID
router.put('/:id', async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate
            (req.params.id, req.body
                , { new: true });
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.json(course);
    } catch (error) {
        console.error('Error updating course:', error);
        res.status(500).json({ message: 'Error updating course' });
    }
}
);

// Route to delete course by ID
router.delete('/:id', async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.json({ message: 'Course deleted successfully' });
    } catch (error) {
        console.error('Error deleting course:', error);
        res.status(500).json({ message: 'Error deleting course' });
    }
});






module.exports = router;