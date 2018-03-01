'use strict';
const taskService = require('../services/task.service');

function getTasks(req, res) {
  taskService.getTasks()
    .then(tasks => {
      if (tasks && task.length) {
        res.status(200).send(tasks);
      }
    })
    .catch(error => {
      if (error) {
        res.status(500).send({ status: 500, message: error.message });
      }
    });
}


function createTask(req, res) {
  let task = {
    name: req.body.name,
    dueDate: req.body.dueDate,
    priority: req.body.priority
  }
  taskService.createTask(task)
    .then(taskStored => {
      if (taskStored) {
        res.status(200).send(taskStored);
      }
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
        res.status(200).send(taskDeleted);
      }
      res.status(404).send({ status: 404, validationErrors: "id is invalid" });
    })
    .catch(error => {
      res.status(500).send({ status: 500, message: error.message });
    });
}


function updateTask(req, res) {
  let task = req.body;
  let taskId = task.id;
  if (!task.id) {
    res.status(400).send({ status: 400, message: 'The id field is not present in document.' });
  }
  task._id = taskId;
  taskService.updateTask(taskId, task)
    .then(taskUpdated => {
      if (taskUpdated) {
        res.status(200).send(taskUpdated);
      }
      res.status(401).send({ status: 401, message: `Not exist a task with id ${taskId}` })
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