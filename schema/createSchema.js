import mongoose from 'mongoose'
//  creating schemas
const userSchema = new mongoose.Schema({
    username: {type: String},
    password: String,
    purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]  //adding a reference to the course so we dont need to make changes as the course changes
  });
  
  const adminSchema = new mongoose.Schema({
    username: String,
    password: String
  });
  
  const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    imageLink: String,
    published: Boolean
  });
  
  // Define mongoose models
  const User = mongoose.model('User', userSchema);
  const Admin = mongoose.model('Admin', adminSchema);
  const Course = mongoose.model('Course', courseSchema);
  export {User, Admin, Course}