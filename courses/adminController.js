import express from 'express';
import jwt from 'jsonwebtoken'; // Import the jwt library
import { User, Course, Admin } from '../schema/createSchema.js';
import cors from 'cors'

const app = express();
app.use(express.json());
app.use(cors())


function adminController(){

app.post('/admin/courses', authenticateJwt, async (req, res) => {
    const course = new Course(req.body);
    await course.save();
    res.json({ message: 'Course created successfully', courseId: course.id });
  });
  
  app.put('/admin/courses/:courseId', authenticateJwt, async (req, res) => {
    const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true });
    if (course) {
      res.json({ message: 'Course updated successfully' });
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  });
  
  app.get('/admin/courses', authenticateJwt, async (req, res) => {
    const courses = await Course.find({});
    res.json({ courses });
  });
  
}
export default adminController;