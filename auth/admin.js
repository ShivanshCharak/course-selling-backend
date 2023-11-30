import express from 'express';
import jwt from 'jsonwebtoken'; // Import the jwt library
import { User, Course, Admin } from '../schema/createSchema.js';
import cors from 'cors'

const app = express();
app.use(express.json());
app.use(cors())

const SECRET="behjbfhejfb "

function authAdmin() {
    app.post('/admin/signup', async (req, res) => {
        const { username, password } = req.body;

        try {
            const admin = await Admin.findOne({ username });

            if (admin) {
                res.status(403).json({ message: 'Admin already exists' });
            } else {
                const obj = { username: username, password: password };
                const newAdmin = new Admin(obj);
                await newAdmin.save();

                const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });

                res.json({ message: 'Admin created successfully', token });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    });

    app.post('/admin/login', async (req, res) => {
        const { username, password } = req.body; // Use req.body to get values from the request body

        try {
            const admin = await Admin.findOne({ username, password });

            if (admin) {
                const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
                res.json({ message: 'Logged in successfully', token });
            } else {
                res.status(403).json({ message: 'Invalid username or password' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    });
}

export default authAdmin;
