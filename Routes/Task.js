const express = require('express');
const router = express.Router();
const taskcon = require('../Controller/TaskController'); // Adjust path if needed

router.post('/tasks', taskcon.postTasks);
router.get('/tasks',  taskcon.getAllTask);
router.get('/tasks/:id', taskcon.getTaskById);
router.put('/tasks/:id', taskcon.putUpdateTask);
router.delete('/tasks/:id', taskcon.deleteTask);
module.exports = router;
