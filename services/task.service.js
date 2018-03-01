'use strict';
var taskSchema = require('../models/task.model');


function createTask(task) {
    let newTask = new taskSchema(task);
    return newTask.save();
}

function getTasks() {
    return taskSchema.find().sort({name: 'asc'});
}

function updateTask(taskId, task) {
    return taskSchema.findByIdAndUpdate(taskId, task);
}

function deleteTask(taskId) {
    return taskSchema.findByIdAndRemove(taskId);
}

module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask
}