'use strict';
const taskService = require('../services/task.service');

function getTasks(req, res) {
  taskService.getTasks()
    .then(tasks => {
      if (tasks) {
        return res.status(200).send(tasks);
      }
      res.status(404).send({ status: 404, message: 'Content not found' });
    })
    .catch(error => {
      if (error) {
        res.status(500).send({ status: 500, message: error.message });
      }
    });
}


function createTask(req, res) {
  let query = req.query;
  if (!query.name || !query.dueDate || !query.priority) {
    return res.status(400).send({ status: 400, message: 'Missing a required field.' });
  }
  let task = {
    name: query.name,
    dueDate: query.dueDate,
    priority: query.priority
  }
  taskService.createTask(task)
    .then(taskStored => {
      if (taskStored) {
        return res.status(200).send(taskStored);
      }
      res.status(400).send({ status: 400, message: 'Task could not be saved.' });
    })
    .catch(error => {
      res.status(500).send({ status: 500, message: error.message });
    });
}


function deleteTask(req, res) {
  let taskId = req.params.id;
  if (!taskId) {
    res.status(400).send({ status: 400, validationErrors: "No id provided." });
  }
  taskService.deleteTask(taskId)
    .then(taskDeleted => {
      if (taskDeleted) {
        return res.status(200).send(taskDeleted);
      }
      res.status(404).send({ status: 404, validationErrors: "id is invalid" });
    })
    .catch(error => {
      res.status(500).send({ status: 500, message: error.message });
    });
}


function updateTask(req, res) {
  let task = req.body.task;
  let taskId = req.body.taskId;
  taskService.updateTask(taskId, task)
    .then(taskUpdated => {
      if (taskUpdated) {
        return res.status(200).send(taskUpdated);
      }
      res.status(401).send({ status: 401, message: `Not exist a task with id ${taskId}` });
    })
    .catch(error => {
      res.status(500).send({ status: 500, message: error.message });
    });
}

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask
};