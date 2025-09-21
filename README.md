# SvaraAI Full-Stack Developer Internship Assignment

A comprehensive task management application built with modern web technologies, featuring user authentication, project management, and an interactive Kanban board with drag-and-drop functionality.

## 🚀 Live Demo

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Architecture](#-architecture)
- [Prerequisites](#-prerequisites)
- [Installation & Setup](#-installation--setup)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Usage Guide](#-usage-guide)
- [Development Workflow](#-development-workflow)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Contributing](#-contributing)

## ✨ Features

### 🔐 Authentication System
- User registration with validation
- Secure login with JWT tokens
- Protected routes and middleware
- Session management with cookies
- Logout functionality

### 📊 Project Management
- Create, read, update, and delete projects
- Project status tracking (Active, On Hold, Completed, Cancelled)
- Color-coded project organization
- Project deadlines and descriptions
- Project statistics and analytics

### 📝 Task Management
- Interactive Kanban board with drag-and-drop
- Task status columns: To Do, In Progress, In Review, Completed
- Task priority levels (Low, Medium, High, Critical)
- Task assignment and due dates
- Task tags and descriptions
- Project-specific task filtering

### 📈 Dashboard & Analytics
- Real-time overview statistics
- Task completion charts and trends
- Project status distribution
- Recent activity tracking
- Performance metrics

### 🎨 Modern UI/UX
- Responsive design with TailwindCSS v4
- Modern and intuitive interface
- Real-time updates and notifications
- Loading states and error handling
- Smooth animations and transitions

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 18** - UI library with latest features
- **TailwindCSS v4** - Utility-first CSS framework
- **React Hook Form** - Form validation and handling
- **@hello-pangea/dnd** - Drag and drop functionality
- **Recharts** - Data visualization and charts
- **React Hot Toast** - Notification system
- **Axios** - HTTP client for API calls
- **js-cookie** - Cookie management

### Backend
- **Express.js** - Node.js web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing and security
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management
- **express-validator** - Input validation middleware

### Development Tools
- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting
- **Git** - Version control
- **npm** - Package management

## 🏗️ Architecture

### System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (Next.js)     │◄──►│   (Express.js)  │◄──►│   (MongoDB)     │
│   Port: 3000    │    │   Port: 5000    │    │   Port: 27017   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Frontend Architecture (Next.js App Router)

```
src/
├── app/                    # App Router pages
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard page
│   ├── projects/          # Project management pages
│   ├── tasks/             # Task management pages
│   ├── layout.js          # Root layout
│   └── page.js            # Home page
├── components/            # Reusable UI components
│   ├── Kanban/           # Kanban board components
│   ├── Layout/           # Layout components
│   ├── Projects/         # Project-specific components
│   └── ui/               # Base UI components
├── contexts/             # React contexts
│   └── AuthContext.js    # Authentication context
└── lib/                  # Utility libraries
    ├── api.js            # API client configuration
    └── utils.js          # Helper functions
```

### Backend Architecture (Express.js)

```
src/
├── config/               # Configuration files
│   └── database.js       # MongoDB connection
├── controllers/          # Business logic
│   ├── authController.js # Authentication logic
│   ├── projectController.js # Project management
│   └── taskController.js # Task management
├── middleware/           # Express middleware
│   ├── auth.js          # Authentication middleware
│   ├── errorHandler.js  # Error handling
│   └── validation.js    # Input validation
├── models/              # Database models
│   ├── User.js          # User schema
│   ├── Project.js       # Project schema
│   └── Task.js          # Task schema
├── routes/              # API routes
│   ├── auth.js          # Authentication routes
│   ├── projects.js      # Project routes
│   └── tasks.js         # Task routes
├── utils/               # Utility functions
│   └── helpers.js       # Helper functions
└── server.js            # Application entry point
```

### Database Schema

```
Users Collection:
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date,
  updatedAt: Date
}

Projects Collection:
{
  _id: ObjectId,
  name: String,
  description: String,
  status: String (Active, On Hold, Completed, Cancelled),
  color: String,
  deadline: Date,
  userId: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}

Tasks Collection:
{
  _id: ObjectId,
  title: String,
  description: String,
  status: String (To Do, In Progress, In Review, Completed),
  priority: String (Low, Medium, High, Critical),
  dueDate: Date,
  tags: [String],
  projectId: ObjectId (ref: Project),
  userId: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

## 📋 Prerequisites

Before running this application, ensure you have:

- **Node.js** (v18.0.0 or higher)
- **npm** (v8.0.0 or higher) or **yarn**
- **MongoDB** (v5.0 or higher) - Local installation or MongoDB Atlas
- **Git** for version control

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Barkat0126/SvaraAI-Full-Stack-Developer-Internship-Assignment.git
cd SvaraAI-Full-Stack-Developer-Internship-Assignment
```

### 2. Backend Setup

Navigate to the backend directory:
```bash
cd backend
```

Install dependencies:
```bash
npm install
```

Create environment file:
```bash
cp .env.example .env
```

Configure your environment variables in `.env`:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/svaraai_taskmanagement
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-complex
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:3000
```

Start the backend server:
```bash
npm start
```

The backend API will be running on `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```

Install dependencies:
```bash
npm install
```

Create environment file (optional):
```bash
# Create .env.local for custom configuration
echo "NEXT_PUBLIC_API_URL=http://localhost:5000/api" > .env.local
```

Start the development server:
```bash
npm run dev
```

The frontend application will be running on `http://localhost:3000`

### 4. Database Setup

#### Option A: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. The application will automatically create the database

#### Option B: MongoDB Atlas (Recommended)
1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get the connection string
4. Update `MONGODB_URI` in your `.env` file

### 5. Verify Installation

1. Open `http://localhost:3000` in your browser
2. Register a new account
3. Create a project and add some tasks
4. Test the Kanban board functionality

## 📁 Project Structure

```
SvaraAI-Full-Stack-Developer-Internship-Assignment/
├── .gitignore                    # Git ignore rules
├── README.md                     # Project documentation
├── setup-demo.js                 # Demo data setup script
├── backend/                      # Backend application
│   ├── .env.example             # Environment variables template
│   ├── package.json             # Backend dependencies
│   ├── package-lock.json        # Dependency lock file
│   └── src/                     # Source code
│       ├── config/              # Configuration files
│       │   └── database.js      # MongoDB connection setup
│       ├── controllers/         # Business logic controllers
│       │   ├── authController.js
│       │   ├── projectController.js
│       │   └── taskController.js
│       ├── middleware/          # Express middleware
│       │   ├── auth.js          # JWT authentication
│       │   ├── errorHandler.js  # Global error handling
│       │   └── validation.js    # Input validation
│       ├── models/              # Mongoose schemas
│       │   ├── User.js
│       │   ├── Project.js
│       │   └── Task.js
│       ├── routes/              # API route definitions
│       │   ├── auth.js
│       │   ├── projects.js
│       │   └── tasks.js
│       ├── tests/               # Test files
│       ├── utils/               # Utility functions
│       │   └── helpers.js
│       └── server.js            # Application entry point
└── frontend/                    # Frontend application
    ├── jsconfig.json            # JavaScript configuration
    ├── next.config.js           # Next.js configuration
    ├── package.json             # Frontend dependencies
    ├── package-lock.json        # Dependency lock file
    ├── tailwind.config.js       # TailwindCSS configuration
    └── src/                     # Source code
        ├── app/                 # Next.js App Router
        │   ├── auth/           # Authentication pages
        │   │   ├── login/
        │   │   └── register/
        │   ├── dashboard/       # Dashboard page
        │   ├── projects/        # Project management
        │   │   └── [id]/       # Dynamic project pages
        │   ├── tasks/          # Task management
        │   ├── globals.css     # Global styles
        │   ├── layout.js       # Root layout
        │   └── page.js         # Home page
        ├── components/         # React components
        │   ├── Kanban/        # Kanban board components
        │   │   ├── CreateTaskModal.js
        │   │   ├── EditTaskModal.js
        │   │   ├── KanbanBoard.js
        │   │   └── TaskCard.js
        │   ├── Layout/        # Layout components
        │   │   ├── Navbar.js
        │   │   └── ProtectedRoute.js
        │   ├── Projects/      # Project components
        │   │   ├── CreateProjectModal.js
        │   │   ├── EditProjectModal.js
        │   │   └── ProjectCard.js
        │   └── ui/            # Base UI components
        │       ├── Badge.js
        │       ├── Button.js
        │       ├── Card.js
        │       ├── Input.js
        │       ├── Modal.js
        │       └── index.js
        ├── contexts/          # React contexts
        │   └── AuthContext.js # Authentication state
        └── lib/               # Utility libraries
            ├── api.js         # API client
            └── utils.js       # Helper functions
```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <jwt_token>
```

#### Logout User
```http
POST /api/auth/logout
Authorization: Bearer <jwt_token>
```

### Project Endpoints

#### Get All Projects
```http
GET /api/projects
Authorization: Bearer <jwt_token>
```

#### Create Project
```http
POST /api/projects
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "name": "New Project",
  "description": "Project description",
  "status": "Active",
  "color": "#3B82F6",
  "deadline": "2024-12-31"
}
```

#### Update Project
```http
PUT /api/projects/:id
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "name": "Updated Project Name",
  "status": "Completed"
}
```

#### Delete Project
```http
DELETE /api/projects/:id
Authorization: Bearer <jwt_token>
```

### Task Endpoints

#### Get All Tasks
```http
GET /api/tasks
Authorization: Bearer <jwt_token>
```

#### Create Task
```http
POST /api/tasks
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "New Task",
  "description": "Task description",
  "status": "To Do",
  "priority": "Medium",
  "projectId": "project_id_here",
  "dueDate": "2024-12-31",
  "tags": ["frontend", "urgent"]
}
```

#### Update Task Status
```http
PATCH /api/tasks/:id/status
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "status": "In Progress"
}
```

## 🎯 Usage Guide

### Getting Started

1. **Register/Login**: Create a new account or login with existing credentials
2. **Dashboard**: View your task and project statistics
3. **Create Projects**: Navigate to Projects page and create your first project
4. **Manage Tasks**: Use the Kanban board to create and organize tasks
5. **Track Progress**: Monitor your progress through the dashboard analytics

### Key Features

#### Project Management
- **Create**: Click "Create Project" and fill in details
- **Edit**: Click the edit icon on any project card
- **Delete**: Use the delete option (with confirmation)
- **Status**: Track project progress with status updates

#### Task Management
- **Kanban Board**: Drag and drop tasks between columns
- **Create Tasks**: Use the "+" button in any column
- **Edit Tasks**: Click on any task card to edit details
- **Filtering**: Filter tasks by project or priority

#### Dashboard Analytics
- **Overview**: See total projects, tasks, and completion rates
- **Charts**: Visual representation of your progress
- **Recent Activity**: Track recent changes and updates

## 🔄 Development Workflow

### Branch Strategy
- `main` - Production-ready code
- `development` - Development branch for new features
- `feature/*` - Feature-specific branches

### Making Changes

1. **Switch to development branch**:
   ```bash
   git checkout development
   ```

2. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes and commit**:
   ```bash
   git add .
   git commit -m "Add: your feature description"
   ```

4. **Push and create pull request**:
   ```bash
   git push origin feature/your-feature-name
   ```

### Code Standards
- Use ESLint for code linting
- Follow React best practices
- Write meaningful commit messages
- Add comments for complex logic

## 🧪 Testing

### Manual Testing Checklist

#### Authentication
- [ ] User registration with validation
- [ ] User login with correct/incorrect credentials
- [ ] Protected route access control
- [ ] JWT token expiration handling
- [ ] Logout functionality

#### Projects
- [ ] Create new projects with all fields
- [ ] Edit existing project information
- [ ] Delete projects with confirmation
- [ ] View project details and statistics
- [ ] Project status updates

#### Tasks
- [ ] Create tasks with all required fields
- [ ] Edit task information and details
- [ ] Delete tasks with confirmation
- [ ] Drag and drop between status columns
- [ ] Filter tasks by project and priority
- [ ] Task priority and due date handling

#### Dashboard
- [ ] View accurate statistics and metrics
- [ ] Navigate between different sections
- [ ] Real-time data updates
- [ ] Chart rendering and interactions

#### UI/UX
- [ ] Responsive design on different screen sizes
- [ ] Loading states during API calls
- [ ] Error handling and user feedback
- [ ] Toast notifications for actions

### Running Tests

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 🚀 Deployment

### Environment Setup

#### Production Environment Variables

**Backend (.env)**:
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/svaraai_taskmanagement
JWT_SECRET=your-production-jwt-secret-very-long-and-secure
JWT_EXPIRE=7d
CORS_ORIGIN=https://your-frontend-domain.com
```

**Frontend (.env.local)**:
```env
NEXT_PUBLIC_API_URL=https://your-backend-domain.com/api
```

### Deployment Options

#### Option 1: Vercel (Frontend) + Railway (Backend)

**Frontend (Vercel)**:
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

**Backend (Railway)**:
1. Connect your GitHub repository to Railway
2. Set environment variables in Railway dashboard
3. Deploy automatically on push to main branch

#### Option 2: Heroku (Full Stack)

**Backend**:
```bash
# Install Heroku CLI and login
heroku create your-app-name-backend
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your-mongodb-uri
heroku config:set JWT_SECRET=your-jwt-secret
git push heroku main
```

**Frontend**:
```bash
heroku create your-app-name-frontend
heroku config:set NEXT_PUBLIC_API_URL=https://your-app-name-backend.herokuapp.com/api
git push heroku main
```

#### Option 3: DigitalOcean App Platform

1. Create a new app in DigitalOcean
2. Connect your GitHub repository
3. Configure build and run commands
4. Set environment variables
5. Deploy

### Build Commands

**Backend**:
```bash
npm install
npm start
```

**Frontend**:
```bash
npm install
npm run build
npm start
```

## 🤝 Contributing

We welcome contributions to improve this project! Here's how you can contribute:

### Getting Started

1. **Fork the repository**
2. **Clone your fork**:
   ```bash
   git clone https://github.com/your-username/SvaraAI-Full-Stack-Developer-Internship-Assignment.git
   ```
3. **Create a feature branch**:
   ```bash
   git checkout -b feature/amazing-feature
   ```

### Making Changes

1. **Follow the coding standards**
2. **Write clear commit messages**
3. **Test your changes thoroughly**
4. **Update documentation if needed**

### Submitting Changes

1. **Push to your fork**:
   ```bash
   git push origin feature/amazing-feature
   ```
2. **Create a Pull Request**
3. **Describe your changes clearly**
4. **Wait for review and feedback**

### Code Style Guidelines

- Use meaningful variable and function names
- Follow React and Express.js best practices
- Add comments for complex logic
- Ensure responsive design for UI changes
- Write clean, readable code

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Known Issues

- Drag and drop may occasionally require a page refresh on slower connections
- Some toast notifications might overlap during rapid actions
- Mobile drag and drop experience could be improved

## 🔮 Future Enhancements

- [ ] Real-time collaboration with WebSockets
- [ ] File attachments for tasks and projects
- [ ] Time tracking and reporting functionality
- [ ] Advanced filtering and search capabilities
- [ ] Email notifications for deadlines and updates
- [ ] Mobile application development
- [ ] Team management and collaboration features
- [ ] Integration with third-party tools (Slack, GitHub, etc.)
- [ ] Advanced analytics and reporting
- [ ] Dark mode theme support

## 📞 Support

For support, questions, or feedback:

- **GitHub Issues**: [Create an issue](https://github.com/Barkat0126/SvaraAI-Full-Stack-Developer-Internship-Assignment/issues)
- **Email**: Contact the development team
- **Documentation**: Refer to this README and inline code comments

## 🙏 Acknowledgments

- **SvaraAI** for the internship opportunity
- **Next.js Team** for the amazing React framework
- **MongoDB** for the flexible database solution
- **TailwindCSS** for the utility-first CSS framework
- **Open Source Community** for the incredible tools and libraries

---

**Built with ❤️ for SvaraAI Full Stack Developer Internship Assignment**

*This project demonstrates modern full-stack development practices, clean architecture, and professional-grade code quality.*