const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: {
       type: String,
       required: [true, 'Must provide name'],
       trim: true,
       maxlength: [20, 'Max length 20 chars']
    }, 
    completed: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Task', taskSchema)