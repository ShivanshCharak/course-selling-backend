import express from "express";
import jwt from "jsonwebtoken"; // Import the jwt library
import { User, Course, Admin } from "../schema/createSchema.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
function userController() {
  const authenticateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, SECRET, (err, user) => {
        if (err) {
          return res.sendStatus(403);
        }
        req.user = user;
        next();
      });
    } else {
      res.sendStatus(401);
    }
  };
  app.get("/users/courses", authenticateJwt, async (req, res) => {
    const courses = await Course.find({ published: true });
    res.json({ courses });
  });

  app.post("/users/courses/:courseId", authenticateJwt, async (req, res) => {
    const course = await Course.findById(req.params.courseId);
    console.log(course);
    if (course) {
      const user = await User.findOne({ username: req.user.username });
      if (user) {
        user.purchasedCourses.push(course);
        await user.save();
        res.json({ message: "Course purchased successfully" });
      } else {
        res.status(403).json({ message: "User not found" });
      }
    } else {
      res.status(404).json({ message: "Course not found" });
    }
  });

  app.get("/users/purchasedCourses", authenticateJwt, async (req, res) => {
    const user = await User.findOne({ username: req.user.username }).populate(
      "purchasedCourses"
    );
    if (user) {
      res.json({ purchasedCourses: user.purchasedCourses || [] });
    } else {
      res.status(403).json({ message: "User not found" });
    }
  });
}
export default userController;
