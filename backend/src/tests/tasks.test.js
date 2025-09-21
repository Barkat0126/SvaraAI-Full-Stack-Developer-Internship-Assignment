const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../models/User');
const Project = require('../models/Project');
const Task = require('../models/Task');

// Test database
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/task-management-test';

describe('Tasks API', () => {
  let authToken;
  let userId;
  let projectId;

  beforeAll(async () => {
    // Connect to test database
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  beforeEach(async () => {
    // Clean database
    await User.deleteMany({});
    await Project.deleteMany({});
    await Task.deleteMany({});

    // Create test user
    const userResponse = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'Test123!'
      });

    authToken = userResponse.body.token;
    userId = userResponse.body.data.user._id;

    // Create test project
    const projectResponse = await request(app)
      .post('/api/projects')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        name: 'Test Project',
        description: 'Test project description'
      });

    projectId = projectResponse.body.data.project._id;
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('POST /api/tasks', () => {
    it('should create a new task', async () => {
      const taskData = {
        title: 'Test Task',
        description: 'Test task description',
        status: 'todo',
        priority: 'medium',
        projectId: projectId,
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      };

      const response = await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${authToken}`)
        .send(taskData)
        .expect(201);

      expect(response.body.status).toBe('success');
      expect(response.body.data.task.title).toBe(taskData.title);
      expect(response.body.data.task.status).toBe(taskData.status);
      expect(response.body.data.task.priority).toBe(taskData.priority);
      expect(response.body.data.task.assignedTo).toBe(userId);
    });

    it('should not create task without required fields', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${authToken}`)
        .send({})
        .expect(400);

      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Validation failed');
    });

    it('should not create task with invalid project ID', async () => {
      const taskData = {
        title: 'Test Task',
        description: 'Test task description',
        projectId: new mongoose.Types.ObjectId()
      };

      const response = await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${authToken}`)
        .send(taskData)
        .expect(404);

      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Project not found');
    });
  });

  describe('GET /api/tasks', () => {
    beforeEach(async () => {
      // Create test tasks
      await Task.create([
        {
          title: 'Task 1',
          status: 'todo',
          priority: 'high',
          projectId: projectId,
          assignedTo: userId
        },
        {
          title: 'Task 2',
          status: 'in-progress',
          priority: 'medium',
          projectId: projectId,
          assignedTo: userId
        },
        {
          title: 'Task 3',
          status: 'done',
          priority: 'low',
          projectId: projectId,
          assignedTo: userId
        }
      ]);
    });

    it('should get all tasks for authenticated user', async () => {
      const response = await request(app)
        .get('/api/tasks')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.status).toBe('success');
      expect(response.body.results).toBe(3);
      expect(response.body.data.tasks).toHaveLength(3);
    });

    it('should filter tasks by status', async () => {
      const response = await request(app)
        .get('/api/tasks?status=todo')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.status).toBe('success');
      expect(response.body.results).toBe(1);
      expect(response.body.data.tasks[0].status).toBe('todo');
    });

    it('should filter tasks by priority', async () => {
      const response = await request(app)
        .get('/api/tasks?priority=high')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.status).toBe('success');
      expect(response.body.results).toBe(1);
      expect(response.body.data.tasks[0].priority).toBe('high');
    });

    it('should paginate tasks', async () => {
      const response = await request(app)
        .get('/api/tasks?page=1&limit=2')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.status).toBe('success');
      expect(response.body.results).toBe(2);
      expect(response.body.pagination.page).toBe(1);
      expect(response.body.pagination.limit).toBe(2);
      expect(response.body.pagination.total).toBe(3);
    });
  });

  describe('GET /api/tasks/project/:projectId', () => {
    beforeEach(async () => {
      await Task.create([
        {
          title: 'Todo Task',
          status: 'todo',
          priority: 'high',
          projectId: projectId,
          assignedTo: userId
        },
        {
          title: 'In Progress Task',
          status: 'in-progress',
          priority: 'medium',
          projectId: projectId,
          assignedTo: userId
        },
        {
          title: 'Done Task',
          status: 'done',
          priority: 'low',
          projectId: projectId,
          assignedTo: userId
        }
      ]);
    });

    it('should get tasks grouped by status for a project', async () => {
      const response = await request(app)
        .get(`/api/tasks/project/${projectId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.status).toBe('success');
      expect(response.body.data.tasks.todo).toHaveLength(1);
      expect(response.body.data.tasks['in-progress']).toHaveLength(1);
      expect(response.body.data.tasks.done).toHaveLength(1);
      expect(response.body.data.totalTasks).toBe(3);
    });
  });

  describe('PUT /api/tasks/:id', () => {
    let taskId;

    beforeEach(async () => {
      const task = await Task.create({
        title: 'Original Task',
        status: 'todo',
        priority: 'medium',
        projectId: projectId,
        assignedTo: userId
      });
      taskId = task._id;
    });

    it('should update a task', async () => {
      const updateData = {
        title: 'Updated Task',
        status: 'in-progress',
        priority: 'high'
      };

      const response = await request(app)
        .put(`/api/tasks/${taskId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData)
        .expect(200);

      expect(response.body.status).toBe('success');
      expect(response.body.data.task.title).toBe(updateData.title);
      expect(response.body.data.task.status).toBe(updateData.status);
      expect(response.body.data.task.priority).toBe(updateData.priority);
    });

    it('should not update task that does not belong to user', async () => {
      // Create another user
      const anotherUserResponse = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Another User',
          email: 'another@example.com',
          password: 'Test123!'
        });

      const anotherToken = anotherUserResponse.body.token;

      const response = await request(app)
        .put(`/api/tasks/${taskId}`)
        .set('Authorization', `Bearer ${anotherToken}`)
        .send({ title: 'Hacked Task' })
        .expect(404);

      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Task not found');
    });
  });

  describe('PATCH /api/tasks/:id/status', () => {
    let taskId;

    beforeEach(async () => {
      const task = await Task.create({
        title: 'Test Task',
        status: 'todo',
        priority: 'medium',
        projectId: projectId,
        assignedTo: userId
      });
      taskId = task._id;
    });

    it('should update task status', async () => {
      const response = await request(app)
        .patch(`/api/tasks/${taskId}/status`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ status: 'in-progress' })
        .expect(200);

      expect(response.body.status).toBe('success');
      expect(response.body.data.task.status).toBe('in-progress');
    });

    it('should not update with invalid status', async () => {
      const response = await request(app)
        .patch(`/api/tasks/${taskId}/status`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ status: 'invalid-status' })
        .expect(400);

      expect(response.body.status).toBe('error');
      expect(response.body.message).toBe('Invalid status');
    });
  });

  describe('DELETE /api/tasks/:id', () => {
    let taskId;

    beforeEach(async () => {
      const task = await Task.create({
        title: 'Task to Delete',
        status: 'todo',
        priority: 'medium',
        projectId: projectId,
        assignedTo: userId
      });
      taskId = task._id;
    });

    it('should delete a task', async () => {
      const response = await request(app)
        .delete(`/api/tasks/${taskId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.status).toBe('success');
      expect(response.body.message).toBe('Task deleted successfully');

      // Verify task is deleted
      const deletedTask = await Task.findById(taskId);
      expect(deletedTask).toBeNull();
    });
  });

  describe('GET /api/tasks/dashboard/stats', () => {
    beforeEach(async () => {
      const now = new Date();
      const futureDate = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      const pastDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

      await Task.create([
        {
          title: 'Todo High',
          status: 'todo',
          priority: 'high',
          projectId: projectId,
          assignedTo: userId,
          deadline: futureDate
        },
        {
          title: 'In Progress Medium',
          status: 'in-progress',
          priority: 'medium',
          projectId: projectId,
          assignedTo: userId,
          deadline: futureDate
        },
        {
          title: 'Done Low',
          status: 'done',
          priority: 'low',
          projectId: projectId,
          assignedTo: userId,
          deadline: futureDate
        },
        {
          title: 'Overdue Task',
          status: 'todo',
          priority: 'high',
          projectId: projectId,
          assignedTo: userId,
          deadline: pastDate
        }
      ]);
    });

    it('should get dashboard statistics', async () => {
      const response = await request(app)
        .get('/api/tasks/dashboard/stats')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.status).toBe('success');
      expect(response.body.data.totalProjects).toBe(1);
      expect(response.body.data.tasksByStatus.todo).toBe(2);
      expect(response.body.data.tasksByStatus['in-progress']).toBe(1);
      expect(response.body.data.tasksByStatus.done).toBe(1);
      expect(response.body.data.tasksByPriority.high).toBe(2);
      expect(response.body.data.tasksByPriority.medium).toBe(1);
      expect(response.body.data.tasksByPriority.low).toBe(1);
      expect(response.body.data.overdueTasks).toBe(1);
    });
  });
});