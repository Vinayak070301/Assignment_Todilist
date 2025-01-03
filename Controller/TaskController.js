const Tasks=require ('../Model/Task.js')
// module.exports.postTasks=async (req, res) => {
//     const { title, description, status } = req.body;
//     const task = new Tasks({ title, description, status });
    
//     try {
//       await task.save();
//       res.status(201).json({ message: 'Task created successfully' });
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   }

module.exports.postTasks = async (req, res) => {
    const { title, description, status } = req.body;
    console.log(title + " "+ description +" " + status)
    if (!title || !description) {
        return res.status(400).json({
            error: "Both 'title' and 'description' are required."
        });
    }

    const task = new Tasks({ title, description, status: status || 'pending' });

    try {
        await task.save();
        res.status(201).json({ message: 'Task created successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports.getAllTask=async (req, res) => {
    try {
        const tasks = await Tasks.find();
        console.log(tasks)
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
module.exports.getTaskById=async (req, res) => {
    try {
        const task = await Tasks.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
module.exports.putUpdateTask = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    console.log(id+" "+status)
    // Validate status
    if (!['pending', 'in-progress', 'completed'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status. Valid statuses are: pending, in-progress, or completed.' });
    }

    try {
        const task = await Tasks.findByIdAndUpdate(id, { status }, { new: true });
        if (!task) {
            return res.status(404).json({ message: 'Task not found.' });
        }
        res.status(200).json({ message: 'Task updated successfully.', task });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred.', error: error.message });
    }
}
module.exports.deleteTask = async (req, res) => {
    const { id } = req.params;

    try {
        const task = await Tasks.findByIdAndDelete(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found.' });
        }
        res.status(200).json({ message: 'Task deleted successfully.', task });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred.', error: error.message });
    }
}