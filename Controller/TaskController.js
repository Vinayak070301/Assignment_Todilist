// Import the Tasks model
const Tasks = require('../Model/Task.js');

// Controller to handle creating a new task
module.exports.postTasks = async (req, res) => {
    const { title, description, status } = req.body;
    console.log(title + " " + description + " " + status);
    
    // Validate input
    if (!title || !description) {
        return res.status(400).json({
            error: "Both 'title' and 'description' are required."
        });
    }

    // Create a new task with the provided data
    const task = new Tasks({ title, description, status: status || 'pending' });

    try {
        await task.save(); // Save task to the database
        res.status(201).json({ message: 'Task created successfully' });
    } catch (error) {
        // Handle errors during saving
        res.status(400).json({ error: error.message });
    }
};

// Controller to handle retrieving all tasks
module.exports.getAllTask = async (req, res) => {
    try {
        const tasks = await Tasks.find(); // Fetch all tasks from the database
        console.log(tasks);
        res.status(200).json(tasks); // Respond with the tasks
    } catch (error) {
        // Handle errors during fetching
        res.status(500).json({ message: error.message });
    }
};

// Controller to handle retrieving a task by ID
module.exports.getTaskById = async (req, res) => {
    try {
        const task = await Tasks.findById(req.params.id); // Find a task by its ID
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(task); // Respond with the task
    } catch (error) {
        // Handle errors during fetching
        res.status(500).json({ message: error.message });
    }
};

// Controller to handle updating a task's status by ID
module.exports.putUpdateTask = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    console.log(id + " " + status);

    // Validate the provided status
    if (!['pending', 'in-progress', 'completed'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status. Valid statuses are: pending, in-progress, or completed.' });
    }

    try {
        const task = await Tasks.findByIdAndUpdate(id, { status }, { new: true }); // Update task status
        if (!task) {
            return res.status(404).json({ message: 'Task not found.' });
        }
        res.status(200).json({ message: 'Task updated successfully.', task });
    } catch (error) {
        // Handle errors during updating
        res.status(500).json({ message: 'An error occurred.', error: error.message });
    }
};

// Controller to handle deleting a task by ID
module.exports.deleteTask = async (req, res) => {
    const { id } = req.params;

    try {
        const task = await Tasks.findByIdAndDelete(id); // Delete the task by ID
        if (!task) {
            return res.status(404).json({ message: 'Task not found.' });
        }
        res.status(200).json({ message: 'Task deleted successfully.', task });
    } catch (error) {
        // Handle errors during deletion
        res.status(500).json({ message: 'An error occurred.', error: error.message });
    }
};
