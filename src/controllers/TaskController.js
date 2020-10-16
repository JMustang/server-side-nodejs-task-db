const { Router } = require( "express" );
const TaskService = require("../services/TaskService");

const TaskController = Router();

TaskController.get('', async (req, res) => {
    try {
        res.json(await TaskService.index())
    } catch (error) {
        res.status(500).json({error: 'TaskService.index() is not working!'})
    };
});

module.exports = TaskController;