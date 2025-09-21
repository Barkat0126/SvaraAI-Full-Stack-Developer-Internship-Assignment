#!/usr/bin/env node

/**
 * Demo Setup Script for Task Management Application
 * This script helps set up demo data for testing the application
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: './backend/.env' });

// Import models
const User = require('./backend/src/models/User');
const Project = require('./backend/src/models/Project');
const Task = require('./backend/src/models/Task');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/taskmanagement';

// Demo data
const demoUsers = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123'
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123'
  }
];

const demoProjects = [
  {
    name: 'Website Redesign',
    description: 'Complete redesign of the company website with modern UI/UX',
    status: 'active',
    color: '#3B82F6',
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
  },
  {
    name: 'Mobile App Development',
    description: 'Develop a cross-platform mobile application',
    status: 'active',
    color: '#10B981',
    deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000) // 60 days from now
  },
  {
    name: 'Marketing Campaign',
    description: 'Q4 marketing campaign for product launch',
    status: 'on-hold',
    color: '#F59E0B',
    deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000) // 45 days from now
  }
];

const demoTasks = [
  // Website Redesign tasks
  {
    title: 'Create wireframes',
    description: 'Design wireframes for all main pages',
    status: 'completed',
    priority: 'high',
    tags: ['design', 'wireframes'],
    dueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
  },
  {
    title: 'Design homepage mockup',
    description: 'Create high-fidelity mockup for the homepage',
    status: 'inProgress',
    priority: 'high',
    tags: ['design', 'mockup'],
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // 3 days from now
  },
  {
    title: 'Implement responsive navigation',
    description: 'Code the responsive navigation component',
    status: 'todo',
    priority: 'medium',
    tags: ['frontend', 'responsive'],
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
  },
  {
    title: 'Set up content management system',
    description: 'Configure CMS for easy content updates',
    status: 'todo',
    priority: 'medium',
    tags: ['backend', 'cms'],
    dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000) // 10 days from now
  },
  
  // Mobile App Development tasks
  {
    title: 'Research cross-platform frameworks',
    description: 'Compare React Native, Flutter, and Ionic',
    status: 'completed',
    priority: 'high',
    tags: ['research', 'frameworks'],
    dueDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000) // 10 days ago
  },
  {
    title: 'Set up development environment',
    description: 'Install and configure React Native development tools',
    status: 'inProgress',
    priority: 'high',
    tags: ['setup', 'react-native'],
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000) // 2 days from now
  },
  {
    title: 'Design app architecture',
    description: 'Plan the overall architecture and data flow',
    status: 'inReview',
    priority: 'high',
    tags: ['architecture', 'planning'],
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000) // 5 days from now
  },
  
  // Marketing Campaign tasks
  {
    title: 'Define target audience',
    description: 'Research and define the primary target audience',
    status: 'todo',
    priority: 'high',
    tags: ['research', 'audience'],
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // 14 days from now
  },
  {
    title: 'Create campaign assets',
    description: 'Design banners, social media posts, and promotional materials',
    status: 'todo',
    priority: 'medium',
    tags: ['design', 'assets'],
    dueDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000) // 21 days from now
  }
];

async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
}

async function clearExistingData() {
  try {
    await Task.deleteMany({});
    await Project.deleteMany({});
    await User.deleteMany({});
    console.log('🧹 Cleared existing data');
  } catch (error) {
    console.error('❌ Error clearing data:', error);
  }
}

async function createDemoUsers() {
  try {
    const users = [];
    
    for (const userData of demoUsers) {
      const hashedPassword = await bcrypt.hash(userData.password, 12);
      const user = new User({
        ...userData,
        password: hashedPassword
      });
      await user.save();
      users.push(user);
    }
    
    console.log('👥 Created demo users');
    return users;
  } catch (error) {
    console.error('❌ Error creating users:', error);
    return [];
  }
}

async function createDemoProjects(users) {
  try {
    const projects = [];
    
    for (const projectData of demoProjects) {
      const project = new Project({
        ...projectData,
        createdBy: users[0]._id // Assign to first user
      });
      await project.save();
      projects.push(project);
    }
    
    console.log('📁 Created demo projects');
    return projects;
  } catch (error) {
    console.error('❌ Error creating projects:', error);
    return [];
  }
}

async function createDemoTasks(users, projects) {
  try {
    const tasks = [];
    
    // Distribute tasks across projects
    const tasksPerProject = [4, 3, 2]; // Website: 4, Mobile: 3, Marketing: 2
    let taskIndex = 0;
    
    for (let i = 0; i < projects.length; i++) {
      const project = projects[i];
      const numTasks = tasksPerProject[i];
      
      for (let j = 0; j < numTasks; j++) {
        if (taskIndex < demoTasks.length) {
          const taskData = demoTasks[taskIndex];
          const task = new Task({
            ...taskData,
            project: project._id,
            assignedTo: users[taskIndex % users.length]._id,
            createdBy: users[0]._id
          });
          await task.save();
          tasks.push(task);
          taskIndex++;
        }
      }
    }
    
    console.log('📋 Created demo tasks');
    return tasks;
  } catch (error) {
    console.error('❌ Error creating tasks:', error);
    return [];
  }
}

async function setupDemo() {
  console.log('🚀 Starting demo setup...\n');
  
  await connectDB();
  await clearExistingData();
  
  const users = await createDemoUsers();
  const projects = await createDemoProjects(users);
  const tasks = await createDemoTasks(users, projects);
  
  console.log('\n✨ Demo setup completed successfully!');
  console.log('\n📊 Demo Data Summary:');
  console.log(`   👥 Users: ${users.length}`);
  console.log(`   📁 Projects: ${projects.length}`);
  console.log(`   📋 Tasks: ${tasks.length}`);
  
  console.log('\n🔐 Demo Login Credentials:');
  console.log('   Email: john@example.com');
  console.log('   Password: password123');
  console.log('\n   Email: jane@example.com');
  console.log('   Password: password123');
  
  console.log('\n🌐 Access the application at: http://localhost:3000');
  
  await mongoose.disconnect();
  console.log('\n👋 Disconnected from MongoDB');
}

// Run the setup if this file is executed directly
if (require.main === module) {
  setupDemo().catch(error => {
    console.error('❌ Demo setup failed:', error);
    process.exit(1);
  });
}

module.exports = { setupDemo };