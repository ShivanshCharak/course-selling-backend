# Course Selling Website

## Overview

This is a course selling website with a backend built using Express and MongoDB. The web application allows users to sign up, log in, view courses, and purchase them. Admins have additional functionalities such as course creation and editing.

## Features

- **User Authentication:** Secure user authentication using JSON Web Tokens (JWT).
- **Role-based Access Control:** Admins and users have different levels of access and permissions.
- **MongoDB Integration:** Utilizes MongoDB to store user, admin, and course data.
- **Middleware for Authentication:** Middleware to authenticate and authorize users based on their role.
- **Admin Dashboard:** Admins can create, edit, and manage courses through a dedicated dashboard.
- **User Course Purchases:** Users can view and purchase courses.

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/course-selling-website.git

# API Endpoints

##Admin Routes

- POST /admin/signup: Create a new admin account.
- POST /admin/login: Log in as an admin.
- POST /admin/courses: Create a new course (requires authentication).
- PUT /admin/courses/:courseId: Update a course (requires authentication).
- GET /admin/courses: Get a list of all courses (requires authentication).
## User Routes
- POST /users/signup: Create a new user account.
- POST /users/login: Log in as a user.
- GET /users/courses: Get a list of available courses for users (published courses only, requires authentication).
- POST /users/courses/:courseId: Purchase a course (requires authentication).
- GET /users/purchasedCourses: Get a list of purchased courses for a user (requires authentication).
## Environment Variables
- SECRET: Secret key for JWT (replace with a secure value, preferably use environment variables).




