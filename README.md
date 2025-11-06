# 🌐 Multi-Language News Aggregation Portal

A full-stack web application that provides users with access to global and local news across multiple languages. This project features a **secure authentication system** with user registration, login, and personalized news dashboards.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Screenshots](#screenshots)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

The **Multi-Language News Aggregation Portal** centralizes content from various news sources and allows users to:
- Register and log in securely
- View personalized news feeds
- Select their preferred language (English, Hindi, Tamil, French, Spanish, German)
- Filter news by category (Technology, Business, Sports, Entertainment, Health)

This project implements **industry-standard security practices** including:
- Password hashing with `bcrypt`
- JWT (JSON Web Token) authentication
- Protected routes and middleware
- Input validation and sanitization

---

## ✨ Features

### 🔐 Authentication System
- **User Registration** with validation
  - Full name, email, username, password
  - Password strength indicator
  - Duplicate email/username prevention
  - Client-side and server-side validation
  
- **User Login**
  - Login with username or email
  - Secure password verification
  - JWT token generation
  - Session management

- **Security Features**
  - Passwords hashed with bcrypt (10 salt rounds)
  - JWT tokens with 7-day expiration
  - Protected routes with authentication middleware
  - XSS and injection prevention

### 📰 News Dashboard
- **Multi-Language Support**
  - English, Hindi (हिन्दी), Tamil (தமிழ்), French (Français), Spanish (Español), German (Deutsch)
  
- **Category Filtering**
  - Technology, Business, Sports, Entertainment, Health
  
- **Responsive Design**
  - Mobile-friendly interface
  - Bootstrap 5 framework
  - Modern gradient UI

---

## 🛠️ Tech Stack

### Frontend
- **HTML5** - Structure
- **CSS3** - Styling with gradients and animations
- **Bootstrap 5.3.2** - Responsive framework
- **JavaScript (ES6+)** - Client-side logic
- **Font Awesome 6.4.2** - Icons
- **Google Fonts (Poppins)** - Typography

### Backend
- **Node.js** - Runtime environment
- **Express.js 4.18.2** - Web framework
- **MongoDB** - Database (via Mongoose 8.0.3)
- **bcrypt 5.1.1** - Password hashing
- **jsonwebtoken 9.0.2** - JWT authentication
- **dotenv 16.3.1** - Environment variables
- **cors 2.8.5** - Cross-Origin Resource Sharing

---

## 📁 Project Structure

```
WEB_TECH_EXP_9/
│
├── client/                      # Frontend files
│   ├── index.html              # Landing page
│   ├── login.html              # Login page
│   ├── register.html           # Registration page
│   └── dashboard.html          # News dashboard
│
├── server/                      # Backend files
│   ├── app.js                  # Express server setup
│   ├── package.json            # Dependencies
│   │
│   ├── models/                 # Database models
│   │   └── User.js             # User schema
│   │
│   ├── routes/                 # API routes
│   │   └── auth.js             # Authentication routes
│   │
│   └── middleware/             # Custom middleware
│       └── auth.js             # JWT verification
│
├── .env                        # Environment variables (not in git)
├── .env.example                # Example environment file
├── .gitignore                  # Git ignore rules
└── README.md                   # This file
```

---

## 🚀 Installation

### Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)
- **npm** or **yarn** package manager

### Step 1: Clone the Repository
```bash
git clone https://github.com/yourusername/multi-language-news-portal.git
cd multi-language-news-portal
```

### Step 2: Install Dependencies
```bash
cd server
npm install
```

### Step 3: Set Up Environment Variables
Create a `.env` file in the `server` directory:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
# Server Configuration
PORT=3000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/news_portal
# Or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/news_portal

# JWT Secret (use a strong random string)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

### Step 4: Start MongoDB
**Local MongoDB:**
```bash
mongod
```

**Or use MongoDB Atlas** (cloud database - free tier available)

### Step 5: Run the Server
```bash
npm start
# Or for development with auto-reload:
npm run dev
```

The server will start on `http://localhost:3000`

---

## ⚙️ Configuration

### MongoDB Setup

#### Option 1: Local MongoDB
1. Install MongoDB Community Edition
2. Start MongoDB service: `mongod`
3. Use connection string: `mongodb://localhost:27017/news_portal`

#### Option 2: MongoDB Atlas (Recommended for deployment)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get connection string
4. Update `.env` with your connection string

### JWT Secret
Generate a strong secret key:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```
Use this value for `JWT_SECRET` in `.env`

---

## 📖 Usage

### 1. Access the Application
Open your browser and navigate to: `http://localhost:3000`

### 2. Register a New Account
- Click "Register" on the landing page
- Fill in all required fields:
  - Full Name
  - Email
  - Username (letters, numbers, underscores only)
  - Password (minimum 6 characters)
  - Confirm Password
- Submit the form

### 3. Login
- Enter your username or email
- Enter your password
- Click "Login"

### 4. Explore the Dashboard
- Select your preferred language
- Filter news by category
- Read news articles
- Logout when done

---

## 🔌 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Endpoints

#### 1. Register User
```http
POST /api/register
```

**Request Body:**
```json
{
  "full_name": "John Doe",
  "email": "john@example.com",
  "username": "johndoe",
  "password": "securepass123",
  "confirm_password": "securepass123"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Registration successful!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "full_name": "John Doe",
    "email": "john@example.com",
    "username": "johndoe"
  }
}
```

#### 2. Login User
```http
POST /api/login
```

**Request Body:**
```json
{
  "identifier": "johndoe",  // username or email
  "password": "securepass123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "full_name": "John Doe",
    "email": "john@example.com",
    "username": "johndoe"
  }
}
```

#### 3. Get User by ID (Protected)
```http
GET /api/user/:id
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "full_name": "John Doe",
    "email": "john@example.com",
    "username": "johndoe",
    "created_at": "2025-11-06T10:30:00.000Z"
  }
}
```

#### 4. Verify Token (Protected)
```http
GET /api/verify
Authorization: Bearer <token>
```

#### 5. Health Check
```http
GET /api/health
```

---

## 📸 Screenshots

### Landing Page
![Landing Page](screenshots/landing.png)

### Registration Page
![Registration](screenshots/register.png)

### Login Page
![Login](screenshots/login.png)

### News Dashboard
![Dashboard](screenshots/dashboard.png)

---

## 🌍 Deployment

### Deploy to Render.com (Recommended)

#### 1. Backend Deployment

1. Create account on [Render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name:** `news-portal-backend`
   - **Environment:** `Node`
   - **Build Command:** `cd server && npm install`
   - **Start Command:** `cd server && npm start`
   - **Instance Type:** Free

5. Add Environment Variables:
   ```
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_secret_key
   NODE_ENV=production
   ```

6. Deploy!

#### 2. Frontend Deployment

**Option A: Serve from Express (Recommended)**
The current setup serves frontend from Express - just deploy the backend and it will serve the frontend automatically.

**Option B: Separate Static Hosting**
Deploy `client/` folder to:
- [Netlify](https://www.netlify.com/)
- [Vercel](https://vercel.com/)
- [GitHub Pages](https://pages.github.com/)

Update API_URL in frontend files to point to your backend URL.

### Production Checklist
- [ ] Use MongoDB Atlas (not local MongoDB)
- [ ] Set strong JWT_SECRET
- [ ] Set NODE_ENV=production
- [ ] Enable HTTPS
- [ ] Add rate limiting
- [ ] Set up error logging
- [ ] Configure CORS properly
- [ ] Add backup strategy for database

---

## 🗄️ Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  full_name: String,
  email: String (unique, lowercase),
  username: String (unique, lowercase),
  password: String (bcrypt hashed),
  created_at: Date (default: now)
}
```

**Indexes:**
- email (unique)
- username (unique)

---

## 🔒 Security Features

1. **Password Security**
   - Bcrypt hashing with 10 salt rounds
   - Minimum 6 character requirement
   - Password strength indicator

2. **JWT Authentication**
   - Secure token generation
   - 7-day token expiration
   - Token verification middleware

3. **Input Validation**
   - Email format validation
   - Username pattern validation
   - Password confirmation
   - XSS prevention

4. **Data Protection**
   - Passwords never returned in API responses
   - Unique email/username enforcement
   - CORS configuration

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- Bootstrap team for the responsive framework
- Font Awesome for icons
- MongoDB for the database
- Express.js community

---

## 📞 Support

For issues or questions:
- Open an issue on GitHub
- Email: your.email@example.com

---

## 🗺️ Roadmap

Future enhancements planned:
- [ ] Integration with NewsAPI.org for real news
- [ ] Email verification system
- [ ] Password reset functionality
- [ ] User profile management
- [ ] News bookmarking feature
- [ ] Social media sharing
- [ ] Push notifications
- [ ] Advanced search filters
- [ ] Dark mode theme
- [ ] Mobile app (React Native)

---

**Made with ❤️ for Web Technology Experiment 9**
