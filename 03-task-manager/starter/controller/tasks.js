const Task = require('../models/task');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom-error');

const getTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({});
    return res.status(200).json({tasks});
});

const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body);
    return res.status(200).json({task});
});

const getTaskById = asyncWrapper(async (req, res) => {
    const {id:taskID} = req.params;
    const task = await Task.findOne({_id: taskID});
    if (!task) {
        console.log(`task with id ${taskID} not found`);
        return next(createCustomError(`task with id ${taskID} not found`, 404));
    }
    return res.status(200).json({task});
});

const updateTask = asyncWrapper(async (req, res, next) => {
    const {id: taskID} = req.params;
    const task = await Task.findOneAndUpdate({_id: taskID}, req.body, {new: true, runValidators: true});
    if (!task) {
        return next(createCustomError(`task with id ${taskID} not found`, 404));
    }
    return res.status(200).json({task});
});

const deleteTask = asyncWrapper(async (req, res) => {
    const {id: taskID} = req.params;
    const task = await Task.findOneAndDelete({_id: taskID});
    if (!task) {
        return next(createCustomError(`task with id ${taskID} not found`, 404));
    }
    return res.status(200).json({task});
});

module.exports = {
    getTasks, 
    createTask, 
    getTaskById, 
    updateTask, 
    deleteTask
};