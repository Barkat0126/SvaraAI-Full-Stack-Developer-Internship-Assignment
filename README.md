# SvaraAI Full-Stack Developer Internship Assignment

A comprehensive task management application built with modern web technologies, featuring user authentication, project management, and an interactive Kanban board with advanced drag-and-drop functionality. This application showcases a complete full-stack implementation with responsive design, modern UI/UX, and professional-grade code architecture.

## 🚀 Live Demo

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Dashboard**: http://localhost:3000/dashboard
- **Projects**: http://localhost:3000/projects

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

### 📝 Advanced Task Management
- **Interactive Kanban Board** with smooth drag-and-drop functionality
- **Four Status Columns**: To Do, In Progress, In Review, Completed
- **Priority System**: Low, Medium, High, Critical with color-coded indicators
- **Task Assignment** and due date management
- **Task Tags** and detailed descriptions
- **Project-specific filtering** and organization
- **Real-time updates** across all connected clients
- **Mobile-optimized** touch interactions

### 📈 Dashboard & Analytics
- **Real-time overview** with live statistics
- **Task completion metrics** and progress tracking
- **Project status distribution** with visual charts
- **Recent activity feed** and change tracking
- **Performance analytics** and productivity insights
- **Responsive dashboard** optimized for all devices

### 🎨 Modern UI/UX Design
- **Mobile-First Responsive Design** with Tailwind CSS
- **Dark Theme** with gradient backgrounds and modern aesthetics
- **Touch-Friendly Interactions** optimized for mobile devices
- **Smooth Animations** and micro-interactions
- **Loading States** and comprehensive error handling
- **Professional Color Scheme** with blue/purple gradients
- **Accessibility Features** and keyboard navigation support

## 🛠️ Tech Stack

### Frontend
- **React 18** with Next.js 14 (App Router)
- **TypeScript** for type safety and better development experience
- **Tailwind CSS** for modern, responsive styling
- **React Hook Form** for efficient form management
- **React Query/TanStack Query** for server state management
- **Framer Motion** for smooth animations and transitions
- **React Beautiful DnD** for advanced drag-and-drop functionality
- **Lucide React** for modern icon system
- **Chart.js/React Chart.js** for data visualization
- **React Hot Toast** for notifications

### Backend
- **Node.js** with Express.js framework
- **TypeScript** for type safety and scalability
- **MongoDB** with Mongoose ODM for data modeling
- **JWT (JSON Web Tokens)** for secure authentication
- **bcrypt** for password hashing and security
- **Express Validator** for comprehensive input validation
- **CORS** for cross-origin resource sharing
- **dotenv** for environment variable management
- **Express Rate Limit** for API protection

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

### Prerequisites
- **Node.js** (v18.0.0 or higher) - [Download here](https://nodejs.org/)
- **npm** (v8.0.0 or higher) or **yarn** package manager
- **MongoDB** (local installation or MongoDB Atlas account) - [Setup guide](https://docs.mongodb.com/manual/installation/)
- **Git** for version control - [Download here](https://git-scm.com/)

### Quick Start Guide

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Barkat0126/SvaraAI-Full-Stack-Developer-Internship-Assignment.git
   cd SvaraAI-Full-Stack-Developer-Internship-Assignment
   ```

2. **Backend Setup**
   ```bash
   # Navigate to backend directory
   cd backend
   
   # Install dependencies
   npm install
   
   # Create environment configuration
   cp .env.example .env
   
   # Edit .env file with your configuration:
   # MONGODB_URI=mongodb://localhost:27017/svaraai-tasks
   # JWT_SECRET=your-super-secret-jwt-key
   # PORT=5000
   # NODE_ENV=development
   
   # Start the backend server
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   # Open new terminal and navigate to frontend directory
   cd frontend
   
   # Install dependencies
   npm install
   
   # Create environment configuration (optional)
   # Create .env.local file for custom API URL if needed
   # NEXT_PUBLIC_API_URL=http://localhost:5000
   
   # Start the frontend development server
   npm run dev
   ```

4. **Database Setup**
   ```bash
   # If using local MongoDB, ensure it's running:
   # Windows: net start MongoDB
   # macOS/Linux: sudo systemctl start mongod
   
   # The application will automatically create the database and collections
   ```

5. **Access the Application**
   - **Frontend**: http://localhost:3000
   - **Backend API**: http://localhost:5000
   - **API Documentation**: http://localhost:5000/api-docs (if implemented)

### Alternative Setup Methods

#### Using Docker (Optional)
```bash
# Build and run with Docker Compose
docker-compose up --build

# Access the application at:
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
```

#### Using MongoDB Atlas (Cloud Database)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string
4. Update the `MONGODB_URI` in your `.env` file

### Troubleshooting

#### Common Issues and Solutions

**Port Already in Use**
```bash
# Kill process on port 3000 or 5000
npx kill-port 3000
npx kill-port 5000
```

**MongoDB Connection Issues**
- Ensure MongoDB is running locally or check Atlas connection string
- Verify network access and firewall settings
- Check MongoDB logs for detailed error messages

**Node.js Version Issues**
```bash
# Check your Node.js version
node --version

# Use Node Version Manager (nvm) to switch versions
nvm install 18
nvm use 18
```

**Package Installation Issues**
```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Verify Installation

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

1. **Register/Login**: Create an account or login with existing credentials
2. **Dashboard Overview**: View your project statistics and recent activity
3. **Create Project**: Set up your first project with a name and description
4. **Add Tasks**: Create tasks with titles, descriptions, priorities, and due dates
5. **Kanban Board**: Use the interactive board to manage task workflow
6. **Track Progress**: Monitor your project progress through analytics

### Detailed Feature Guide

#### 🔐 User Authentication
- **Secure Registration**: Create account with email validation
- **Login System**: JWT-based authentication with secure sessions
- **Password Security**: bcrypt encryption for password protection
- **Session Management**: Automatic token refresh and logout

#### 📊 Dashboard Features
- **Real-time Statistics**: Live updates of project and task metrics
- **Visual Analytics**: Charts showing task distribution and completion rates
- **Recent Activity**: Timeline of recent changes and updates
- **Quick Actions**: Fast access to create projects and tasks
- **Responsive Design**: Optimized for desktop, tablet, and mobile

#### 🗂️ Project Management
- **Create Projects**: Add new projects with custom names and descriptions
- **Project Overview**: View project-specific statistics and progress
- **Project Settings**: Edit project details and configurations
- **Project Analytics**: Detailed insights into project performance
- **Multi-project Support**: Manage multiple projects simultaneously

#### ✅ Advanced Task Management
- **Task Creation**: Rich task creation with multiple fields
  - Title and detailed descriptions
  - Priority levels (Low, Medium, High, Critical)
  - Due dates and deadlines
  - Custom tags and categories
- **Kanban Board**: Interactive drag-and-drop interface
  - Four status columns: To Do, In Progress, In Review, Completed
  - Smooth animations and visual feedback
  - Touch-friendly mobile interactions
  - Real-time updates across sessions
- **Task Operations**:
  - Edit tasks inline or in modal dialogs
  - Delete tasks with confirmation
  - Bulk operations for multiple tasks
  - Task filtering and search functionality

#### 📱 Mobile Experience
- **Responsive Design**: Fully optimized for mobile devices
- **Touch Interactions**: Native-feeling touch gestures
- **Mobile Navigation**: Simplified navigation for small screens
- **Offline Support**: Basic offline functionality (future enhancement)

#### 🎨 UI/UX Features
- **Modern Design**: Clean, professional interface with dark theme
- **Smooth Animations**: Micro-interactions and transitions
- **Loading States**: Visual feedback during data operations
- **Error Handling**: User-friendly error messages and recovery
- **Accessibility**: Keyboard navigation and screen reader support

### Workflow Examples

#### Creating Your First Project
1. Navigate to the Dashboard
2. Click "Create New Project"
3. Enter project name and description
4. Click "Create Project"
5. You'll be redirected to the project's Kanban board

#### Managing Tasks on Kanban Board
1. Click "Add Task" to create a new task
2. Fill in task details (title, description, priority, due date)
3. Task appears in "To Do" column
4. Drag tasks between columns to update status
5. Click on tasks to edit or view details

#### Using the Dashboard Analytics
1. View overview statistics on the main dashboard
2. Check task completion rates and trends
3. Monitor recent activity and changes
4. Use filters to focus on specific projects or time periods

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