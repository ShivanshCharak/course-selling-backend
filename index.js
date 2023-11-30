import authAdmin from './auth/admin.js'
import express from 'express'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { User,Course,Admin } from './schema/createSchema.js';
import adminController from './courses/adminController.js';
import authUser from './auth/user.js'
import userController from './courses/userController.js';
const app = express();
dotenv.config()
app.use(express.json()); // so it can accept data in body

// Connect to MongoDB
 mongoose.connect(process.env.MONGODB).then(()=>{
    console.log("Connected to MongoDB");
}).catch(err=>{
    console.log(err)
});

app.use("/admin/auth",authAdmin)
app.use("/user/auth",authUser)
app.use('admin/courses',adminController)
app.use('user/courses',userController)

// User routes

app.listen(3000, () => console.log('Server running on port 3000'));