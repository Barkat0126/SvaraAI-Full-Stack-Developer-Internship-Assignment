const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Task title is required'],
    trim: true,
    maxlength: [200, 'Task title cannot be more than 200 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  status: {
    type: String,
    enum: ['todo', 'in-progress', 'done'],
    default: 'todo',
    required: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
    required: true
  },
  deadline: {
    type: Date,
    validate: {
      validator: function(value) {
        return !value || value > new Date();
      },
      message: 'Deadline must be in the future'
    }
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: [true, 'Project ID is required']
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: [30, 'Tag cannot be more than 30 characters']
  }],
  position: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Virtual for checking if task is overdue
taskSchema.virtual('isOverdue').get(function() {
  return this.deadline && this.deadline < new Date() && this.status !== 'done';
});

// Virtual for priority color
taskSchema.virtual('priorityColor').get(function() {
  const colors = {
    low: '#10B981',    // Green
    medium: '#F59E0B', // Yellow
    high: '#EF4444'    // Red
  };
  return colors[this.priority] || colors.medium;
});

// Indexes for better query performance
taskSchema.index({ projectId: 1, status: 1 });
taskSchema.index({ assignedTo: 1, deadline: 1 });
taskSchema.index({ status: 1, priority: 1 });

// Pre-save middleware to set position for new tasks
taskSchema.pre('save', async function(next) {
  if (this.isNew && this.position === 0) {
    const lastTask = await this.constructor
      .findOne({ projectId: this.projectId, status: this.status })
      .sort({ position: -1 });
    
    this.position = lastTask ? lastTask.position + 1 : 1;
  }
  next();
});

module.exports = mongoose.model('Task', taskSchema);