# Task Management Application

A full-stack task management application built with Next.js 15, Express.js, and MongoDB. Features include user authentication, project management, and a Kanban board with drag-and-drop functionality.

## 🚀 Features

### Authentication
- User registration and login
- JWT-based authentication
- Protected routes
- Secure logout functionality

### Project Management
- Create, read, update, and delete projects
- Project status tracking (Active, On Hold, Completed, Cancelled)
- Color-coded project organization
- Project deadlines and descriptions

### Task Management
- Kanban board with drag-and-drop functionality
- Task status columns: To Do, In Progress, In Review, Completed
- Task priority levels (Low, Medium, High, Critical)
- Task assignment and due dates
- Task tags and descriptions
- Project-specific task filtering

### Dashboard & Analytics
- Overview statistics
- Task completion charts
- Project status distribution
- Recent activity tracking

### UI/UX
- Responsive design with TailwindCSS
- Modern and intuitive interface
- Real-time updates
- Toast notifications
- Loading states and error handling

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TailwindCSS v4** - Utility-first CSS framework
- **React Hook Form** - Form validation and handling
- **@hello-pangea/dnd** - Drag and drop functionality
- **Recharts** - Data visualization
- **React Hot Toast** - Notification system
- **Axios** - HTTP client
- **js-cookie** - Cookie management

### Backend
- **Express.js** - Node.js web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas)

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd task-management-app
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
MONGODB_URI=mongodb://localhost:27017/taskmanagement
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=7d
```

Start the backend server:
```bash
npm start
```

The backend will be running on `http://localhost:5000`

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
# Create .env.local if you need to customize the API URL
echo "NEXT_PUBLIC_API_URL=http://localhost:5000/api" > .env.local
```

Start the development server:
```bash
npm run dev
```

The frontend will be running on `http://localhost:3000`

## 📁 Project Structure

```
task-management-app/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── projectController.js
│   │   │   └── taskController.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   ├── errorHandler.js
│   │   │   └── validation.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Project.js
│   │   │   └── Task.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── projects.js
│   │   │   └── tasks.js
│   │   ├── utils/
│   │   │   └── helpers.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── auth/
│   │   │   ├── dashboard/
│   │   │   ├── projects/
│   │   │   ├── tasks/
│   │   │   ├── layout.js
│   │   │   └── page.js
│   │   ├── components/
│   │   │   ├── Kanban/
│   │   │   ├── Layout/
│   │   │   └── Projects/
│   │   ├── contexts/
│   │   │   └── AuthContext.js
│   │   └── lib/
│   │       └── api.js
│   ├── jsconfig.json
│   ├── next.config.js
│   ├── tailwind.config.js
│   └── package.json
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create a new project
- `GET /api/projects/:id` - Get project by ID
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `GET /api/projects/stats` - Get project statistics

### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/:id` - Get task by ID
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `GET /api/tasks/project/:projectId` - Get tasks by project
- `PATCH /api/tasks/:id/status` - Update task status
- `GET /api/tasks/dashboard/stats` - Get dashboard statistics

## 🎯 Usage

### Getting Started
1. Register a new account or login with existing credentials
2. Create your first project from the Projects page
3. Add tasks to your project using the Kanban board
4. Drag and drop tasks between different status columns
5. Monitor progress through the Dashboard analytics

### Key Features Usage

**Creating Projects:**
- Navigate to Projects page
- Click "Create Project" button
- Fill in project details including name, description, deadline, and color
- Set project status (Active, On Hold, Completed, Cancelled)

**Managing Tasks:**
- Use the Kanban board on the Tasks page or within specific projects
- Create tasks with titles, descriptions, priorities, and due dates
- Assign tasks to projects and add relevant tags
- Drag tasks between columns to update their status

**Dashboard Analytics:**
- View task completion trends
- Monitor project status distribution
- Track recent activity and upcoming deadlines

## 🧪 Testing

### Manual Testing Checklist

**Authentication:**
- [ ] User registration with validation
- [ ] User login with correct credentials
- [ ] Protected route access control
- [ ] Logout functionality

**Projects:**
- [ ] Create new projects
- [ ] Edit existing projects
- [ ] Delete projects
- [ ] View project details

**Tasks:**
- [ ] Create tasks with all fields
- [ ] Edit task information
- [ ] Delete tasks
- [ ] Drag and drop between columns
- [ ] Filter tasks by project

**Dashboard:**
- [ ] View statistics and charts
- [ ] Navigate between different sections

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB Atlas or use a cloud MongoDB service
2. Update environment variables for production
3. Deploy to platforms like Heroku, Railway, or DigitalOcean

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy to Vercel, Netlify, or similar platforms
3. Update API URL in environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🐛 Known Issues

- Drag and drop may occasionally require a page refresh on slower connections
- Some toast notifications might overlap on rapid actions

## 🔮 Future Enhancements

- Real-time collaboration with WebSockets
- File attachments for tasks
- Time tracking functionality
- Advanced filtering and search
- Email notifications
- Mobile app development
- Team management features

## 📞 Support

For support, please open an issue in the GitHub repository or contact the development team.

---

**Built with ❤️ for SvaraAI Full Stack Developer Internship Assignment**#   S v a r a A I - F u l l - S t a c k - D e v e l o p e r - I n t e r n s h i p - A s s i g n m e n t  
 #   S v a r a A I - F u l l - S t a c k - D e v e l o p e r - I n t e r n s h i p - A s s i g n m e n t  
 #   S v a r a A I - F u l l - S t a c k - D e v e l o p e r - I n t e r n s h i p - A s s i g n m e n t  
 