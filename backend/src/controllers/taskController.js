const { validationResult } = require('express-validator');
const Task = require('../models/Task');
const Project = require('../models/Project');

// @desc    Get all tasks with filters and pagination
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build filter object
    const filter = { assignedTo: req.user.id };

    // Add filters based on query parameters
    if (req.query.status) {
      filter.status = req.query.status;
    }

    if (req.query.priority) {
      filter.priority = req.query.priority;
    }

    if (req.query.projectId) {
      filter.projectId = req.query.projectId;
    }

    // Date range filter
    if (req.query.startDate || req.query.endDate) {
      filter.dueDate = {};
      if (req.query.startDate) {
        filter.dueDate.$gte = new Date(req.query.startDate);
      }
      if (req.query.endDate) {
        filter.dueDate.$lte = new Date(req.query.endDate);
      }
    }

    // Search filter
    if (req.query.search) {
      filter.$or = [
        { title: { $regex: req.query.search, $options: 'i' } },
        { description: { $regex: req.query.search, $options: 'i' } }
      ];
    }

    const tasks = await Task.find(filter)
      .populate('projectId', 'name color')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Task.countDocuments(filter);

    res.status(200).json({
      status: 'success',
      results: tasks.length,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      data: {
        tasks
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get tasks by project
// @route   GET /api/tasks/project/:projectId
// @access  Private
const getTasksByProject = async (req, res, next) => {
  try {
    // Verify project ownership
    const project = await Project.findOne({
      _id: req.params.projectId,
      owner: req.user.id
    });

    if (!project) {
      return res.status(404).json({
        status: 'error',
        message: 'Project not found'
      });
    }

    const tasks = await Task.find({ projectId: req.params.projectId })
      .populate('projectId', 'name color')
      .sort({ position: 1, createdAt: 1 });

    // Group tasks by status for Kanban board
    const groupedTasks = {
      'todo': tasks.filter(task => task.status === 'todo'),
      'in-progress': tasks.filter(task => task.status === 'in-progress'),
      'done': tasks.filter(task => task.status === 'done')
    };

    res.status(200).json({
      status: 'success',
      data: {
        project: {
          id: project._id,
          name: project.name,
          color: project.color
        },
        tasks: groupedTasks,
        totalTasks: tasks.length
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single task
// @route   GET /api/tasks/:id
// @access  Private
const getTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      assignedTo: req.user.id
    }).populate('projectId', 'name color');

    if (!task) {
      return res.status(404).json({
        status: 'error',
        message: 'Task not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        task
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    // Verify project ownership
    const project = await Project.findOne({
      _id: req.body.projectId,
      owner: req.user.id
    });

    if (!project) {
      return res.status(404).json({
        status: 'error',
        message: 'Project not found'
      });
    }

    const taskData = {
      ...req.body,
      assignedTo: req.user.id
    };

    const task = await Task.create(taskData);
    await task.populate('projectId', 'name color');

    res.status(201).json({
      status: 'success',
      data: {
        task
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, assignedTo: req.user.id },
      req.body,
      {
        new: true,
        runValidators: true
      }
    ).populate('projectId', 'name color');

    if (!task) {
      return res.status(404).json({
        status: 'error',
        message: 'Task not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        task
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update task status (for drag and drop)
// @route   PATCH /api/tasks/:id/status
// @access  Private
const updateTaskStatus = async (req, res, next) => {
  try {
    const { status, position } = req.body;

    if (!['todo', 'in-progress', 'done'].includes(status)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid status'
      });
    }

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, assignedTo: req.user.id },
      { status, ...(position !== undefined && { position }) },
      {
        new: true,
        runValidators: true
      }
    ).populate('projectId', 'name color');

    if (!task) {
      return res.status(404).json({
        status: 'error',
        message: 'Task not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        task
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      assignedTo: req.user.id
    });

    if (!task) {
      return res.status(404).json({
        status: 'error',
        message: 'Task not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Task deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get dashboard statistics
// @route   GET /api/tasks/dashboard/stats
// @access  Private
const getDashboardStats = async (req, res, next) => {
  try {
    // Get user's projects
    const projects = await Project.find({ owner: req.user.id });
    const projectIds = projects.map(p => p._id);

    // Total projects
    const totalProjects = projects.length;

    // Tasks by status
    const tasksByStatus = await Task.aggregate([
      { $match: { assignedTo: req.user._id } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Tasks by priority
    const tasksByPriority = await Task.aggregate([
      { $match: { assignedTo: req.user._id } },
      {
        $group: {
          _id: '$priority',
          count: { $sum: 1 }
        }
      }
    ]);

    // Overdue tasks
    const overdueTasks = await Task.countDocuments({
      assignedTo: req.user.id,
      dueDate: { $lt: new Date() },
      status: { $ne: 'Done' }
    });

    // Recent tasks
    const recentTasks = await Task.find({ assignedTo: req.user.id })
      .populate('projectId', 'name color')
      .sort({ createdAt: -1 })
      .limit(5);

    // Tasks due this week
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);

    const tasksThisWeek = await Task.countDocuments({
      assignedTo: req.user.id,
      dueDate: { $gte: weekStart, $lte: weekEnd },
      status: { $ne: 'Done' }
    });

    res.status(200).json({
      status: 'success',
      data: {
        totalProjects,
        tasksByStatus: tasksByStatus.reduce((acc, item) => {
          acc[item._id] = item.count;
          return acc;
        }, { 'To Do': 0, 'In Progress': 0, 'Done': 0 }),
        tasksByPriority: tasksByPriority.reduce((acc, item) => {
          acc[item._id] = item.count;
          return acc;
        }, { 'Low': 0, 'Medium': 0, 'High': 0 }),
        overdueTasks,
        tasksThisWeek,
        recentTasks
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTasks,
  getTasksByProject,
  getTask,
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
  getDashboardStats
};