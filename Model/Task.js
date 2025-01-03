// Import the mongoose module
const mongoose = require('mongoose');

// Define the schema for tasks
const taskSchema = new mongoose.Schema({
    title: { 
        type: String, // The title of the task (string)
        required: true // This field is mandatory
    },
    description: { 
        type: String, // A brief description of the task
        required: true // This field is mandatory
    },
    status: { 
        type: String, // The current status of the task (e.g., pending, completed)
        default: 'pending' // Default value is 'pending'
    },
});

// Export the Task model, linking it to the 'Tasks' collection in MongoDB
module.exports = mongoose.model('Tasks', taskSchema);
