// Import the Express module
const express = require('express');
const router = express.Router(); // Create an Express router

// Import the task controller to handle task-related logic
const taskcon = require('../Controller/TaskController'); // Adjust the path if necessary

// Route to create a new task
router.post('/tasks', taskcon.postTasks);

// Route to retrieve all tasks
router.get('/tasks', taskcon.getAllTask);

// Route to retrieve a specific task by its ID
router.get('/tasks/:id', taskcon.getTaskById);

// Route to update an existing task by its ID
router.put('/tasks/:id', taskcon.putUpdateTask);

// Route to delete a specific task by its ID
router.delete('/tasks/:id', taskcon.deleteTask);

// Export the router so it can be used in other parts of the application
module.exports = router;
