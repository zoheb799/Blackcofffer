# Blackcofffer

Welcome to the Blackcofffer repository! This project provides a seamless setup for interactive charts and visualizations, leveraging both frontend and backend technologies. Follow the instructions below to get started.

Getting Started
To get the project up and running, follow these steps for the frontend and backend setup:

Prerequisites
Node.js installed on your system
MongoDB cluster URL for database connection
Setup
1. Clone the Repository
bash
Copy code
git clone : https://github.com/zoheb799/Blackcofffer
cd Project-Name
2. Configure Environment Variables
Create a .env file in the root of your project directory and add the following details:

plaintext
Copy code
PORT=7000
MONGODB_URI=<your-mongodb-cluster-url>
Frontend
Navigate to the frontend directory:

bash
Copy code
cd frontend
Install the required dependencies:

bash
Copy code
npm install
Start the development server:

bash
Copy code
npm run dev
The frontend should now be running locally and accessible at http://localhost:3000 (or as specified in your frontend configuration).

Backend
Navigate to the backend directory:

bash
Copy code
cd backend
Install the required dependencies:

bash
Copy code
npm install
Start the development server:

bash
Copy code
npm run dev
The backend server will be running on http://localhost:7000 as defined in your .env file.