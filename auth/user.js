import express from 'express';
import jwt from 'jsonwebtoken'; // Import the jwt library
import { User, Course, Admin } from '../schema/createSchema.js';
import cors from 'cors'

const app = express();
app.use(express.json());
app.use(cors())

const SECRET="behjbfhejfb "

function User(){
    app.post('/users/signup', async (req, res) => {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (user) {
          res.status(403).json({ message: 'User already exists' });
        } else {
          const newUser = new User({ username, password });
          await newUser.save();
          const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
          res.json({ message: 'User created successfully', token });
        }
      });
      
      app.post('/users/login', async (req, res) => {
        const { username, password } = req.headers;
        const user = await User.findOne({ username, password });
        if (user) {
          const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
          res.json({ message: 'Logged in successfully', token });
        } else {
          res.status(403).json({ message: 'Invalid username or password' });
        }
      });
      

}
export default User;