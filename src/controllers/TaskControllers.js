const {Router} = require("express");

const TaskControllers = Router();

TaskControllers.get("", (req, res) => {
    res.send("Deu certo!");
});

module.exports = TaskControllers;