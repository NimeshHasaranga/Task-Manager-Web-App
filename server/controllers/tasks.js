const Task = require('../models/Task');
const ErrorResponse = require('../utils/errorResponse');

// Helper function for advanced filtering
const advancedResults = async (model, req, filter = {}) => {
  let query;

  // Copy req.query
  const reqQuery = { ...req.query };

  // Fields to exclude
  const removeFields = ['select', 'sort', 'page', 'limit'];
  removeFields.forEach(param => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  // Finding resource
  query = model.find(JSON.parse(queryStr)).where(filter);

  // Select fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments();

  query = query.skip(startIndex).limit(limit);

  // Executing query
  const results = await query;

  // Pagination result
  const pagination = {};
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    };
  }

  return {
    success: true,
    count: results.length,
    pagination,
    data: results
  };
};

// Get all tasks
exports.getTasks = async (req, res, next) => {
  try {
    const results = await advancedResults(Task, req, { user: req.user.id });
    res.status(200).json(results);
  } catch (err) {
    next(err);
  }
};

// Get single task
exports.getTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id).where({ user: req.user.id });

    if (!task) {
      return next(new ErrorResponse(`Task not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({
      success: true,
      data: task
    });
  } catch (err) {
    next(err);
  }
};

// Create task
exports.createTask = async (req, res, next) => {
  try {
    // Add user to req.body
    req.body.user = req.user.id;

    const task = await Task.create(req.body);

    res.status(201).json({
      success: true,
      data: task
    });
  } catch (err) {
    next(err);
  }
};

// Update task
exports.updateTask = async (req, res, next) => {
  try {
    let task = await Task.findById(req.params.id).where({ user: req.user.id });

    if (!task) {
      return next(new ErrorResponse(`Task not found with id of ${req.params.id}`, 404));
    }

    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: task
    });
  } catch (err) {
    next(err);
  }
};

// Delete task
exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id).where({ user: req.user.id });

    if (!task) {
      return next(new ErrorResponse(`Task not found with id of ${req.params.id}`, 404));
    }

    await task.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};