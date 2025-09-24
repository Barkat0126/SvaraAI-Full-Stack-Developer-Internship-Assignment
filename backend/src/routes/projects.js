const express = require('express');
const { body } = require('express-validator');
const {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  getProjectStats
} = require('../controllers/projectController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Validation rules
const projectValidation = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Project name must be between 1 and 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot be more than 500 characters'),
  body('color')
    .optional()
    .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
    .withMessage('Color must be a valid hex color'),
  body('status')
    .optional()
    .isIn(['Active', 'Completed', 'On Hold'])
    .withMessage('Status must be Active, Completed, or On Hold'),
  body('deadline')
    .optional()
    .isISO8601()
    .withMessage('Deadline must be a valid date')
];

// Apply authentication middleware to all routes
router.use(protect);

// Routes
router.route('/')
  .get(getProjects)
  .post(projectValidation, createProject);

router.route('/:id')
  .get(getProject)
  .put(projectValidation, updateProject)
  .delete(deleteProject);

router.get('/:id/stats', getProjectStats);

module.exports = router;