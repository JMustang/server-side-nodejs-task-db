const express = require("express");
const TaskController = require("./controllers/TaskController");

const controllers = express();

controllers.use("/tasks", TaskController);

    module.exports = controllers;