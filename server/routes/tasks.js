const express = require('express');
const router = express.Router();
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
} = require('../controllers/tasks');
const { protect } = require('../middleware/auth');

// All routes start with /api/v1/tasks (from server.js mounting)

router.get('/', protect, getTasks);
router.post('/', protect, createTask);
router.get('/:id', protect, getTask);
router.put('/:id', protect, updateTask);
router.delete('/:id', protect, deleteTask);

module.exports = router;