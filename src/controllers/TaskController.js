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

TaskController.post('', async (req, res) => {

    const { title, description, status } = req.body

    if (!title) {
        return res.status(400).json({ error: 'Title cannot be empty!'})
    };

    try { res.status(201).json(await TaskService.store({ title, description, status }))
    } catch (error) {
        res.status(500).json({error: 'TaskService.store() is not working!'})
    };
});

module.exports = TaskController;