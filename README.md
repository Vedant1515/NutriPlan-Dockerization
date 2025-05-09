NutriPlan – Meal Planning & Nutrition App

Overview
NutriPlan is a full-stack web application that simplifies personalized meal planning and grocery list creation. This repository contains the complete implementation using Node.js, Express, HTML, CSS, and MongoDB. It also includes detailed setup instructions, design principles, and validation standards to support effective collaboration and high code quality.

Getting Started
Prerequisites
Before running this project locally, ensure the following tools and technologies are installed:

Node.js (v16 or higher)

npm (comes with Node.js)

MongoDB (local instance or MongoDB Atlas)

Git

Installation
Clone the repository
git clone https://github.com/your-username/nutriplan.git
cd nutriplan

Install project dependencies
npm install


Set up environment variables

Create a .env file in the root directory and configure the following:

PORT=3000
MONGO_URI=your_mongodb_connection_string

Start the server

node server.js

Access the application

Open your browser and navigate to: http://localhost:3000



Technology Stack
Frontend  - 	HTML, CSS, JavaScript
Backend   - 	Node.js, Express
Database  - 	MongoDB (Mongoose)
Testing	  -     Cypress (End-to-End)
Configuration - dotenv


User Input Validation Rules
Email: Must be a valid email format (e.g., user@example.com)

Password: Minimum 8 characters, with at least one number and one special character

Meal Preferences: Required selection from available options

Grocery List Items: Must be generated from meal plan or validated manually

Contributing
To contribute to this project:

Fork the repository and clone your fork.

Create a feature branch (git checkout -b feature-name).

Commit your changes following best practices and standards.

Push the branch to your fork (git push origin feature-name).

Open a pull request describing your changes.