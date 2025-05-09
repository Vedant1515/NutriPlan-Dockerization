# NutriPlan – Meal Planning & Nutrition App

## Overview

**NutriPlan** is a full-stack web application that simplifies personalized meal planning and grocery list creation. This repository contains the complete implementation using Node.js, Express, HTML, CSS, and MongoDB. It also includes detailed setup instructions, design principles, and validation standards to support effective collaboration and high code quality.

## Getting Started

### Prerequisites

Before running this project locally, ensure the following tools and technologies are installed:

- Node.js (v16 or higher)
- npm (comes with Node.js)
- MongoDB (local instance or MongoDB Atlas)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/nutriplan.git
   cd nutriplan
   ```

2. **Install project dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory and configure the following:

   ```
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   ```

4. **Start the server**
   ```bash
   node server.js
   ```

5. **Access the application**

   Open your browser and navigate to: `http://localhost:3000`

## Technology Stack

- **Frontend**: HTML, CSS, JavaScript  
- **Backend**: Node.js, Express  
- **Database**: MongoDB (Mongoose)  
- **Testing**: Cypress (End-to-End)  
- **Configuration**: dotenv  

## User Input Validation Rules

- **Email**: Must be a valid email format (e.g., `user@example.com`)
- **Password**: Minimum 8 characters, with at least one number and one special character
- **Meal Preferences**: Required selection from available options
- **Grocery List Items**: Must be generated from the meal plan or validated manually

## Contributing

To contribute to this project:

1. Fork the repository and clone your fork.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes following best practices and standards.
4. Push the branch to your fork:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request describing your changes.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
