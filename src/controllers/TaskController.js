const { Router } = require("express");
const TaskService = require("../services/TaskService");

const TaskController = Router();

TaskController.get("", async (req, res) => {
  const { status } = req.query;
  try {
    if (status) {
      res.json(await TaskService.indexByStatus(status));
    } else {
      req.json(await TaskService.index());
    }
  } catch (error) {
    res.status(500).json({ error: "TaskService.index() is not working!" });
  }
});

TaskController.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const existsTask = await TaskService.existsById(id);
    if (existsTask) {
      try {
        res.status(200).json(await TaskService.show(id));
      } catch (error) {
        res.status(500).json({ error: "TaskService.show() is not working!" });
      }
    } else {
      res.status(404).json({ error: `Id ${id} not found` });
    }
  } catch (error) {
    res.status(500).json({ error: "TaskService.existsById() is not working!" });
  }
});

TaskController.post("", async (req, res) => {
  const { title, description, status } = req.body;
  const user_id = req.user_id;

  if (!title) {
    return res.status(400).json({ error: "Title cannot be empty!" });
  }

  try {
    res
      .status(201)
      .json(await TaskService.store({ user_id, title, description, status }));
  } catch (error) {
    res.status(500).json({ error: "TaskService.store() is not working!" });
  }
});

TaskController.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const existsTask = await TaskService.existsById(id);
    if (existsTask) {
      try {
        TaskService.destroy(id);
        res.json();
      } catch (error) {
        res
          .status(500)
          .json({ error: "TaskService.destroy() is not working!" });
      }
    } else {
      res.status(404).json({ error: `Id ${id} not found` });
    }
  } catch (error) {
    res.status(500).json({ error: "TaskService.existsById() is not working!" });
  }
});

TaskController.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, status, created_at } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title cannot be empty!" });
  }

  try {
    const existsTask = await TaskService.existsById(id);
    if (existsTask) {
      try {
        res.json(
          await TaskService.update({
            id,
            title,
            description,
            status,
            created_at,
          })
        );
      } catch (error) {
        res.status(500).json({ error: "TaskService.update() is not working!" });
      }
    } else {
      res.status(404).json({ error: `Id ${id} not found` });
    }
  } catch (error) {
    res.status(500).json({ error: "TaskService.existsById() is not working!" });
  }
});

TaskController.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const existsTask = await TaskService.existsById(id);
    if (existsTask) {
      try {
        await TaskService.updateStatus({ status, id });
        res.json();
      } catch (error) {
        console.log(error);
        res
          .status(500)
          .json({ error: "TaskService.updateStatus() is not working" });
      }
    } else {
      res.status(404).json({ error: `Id ${id} not found` });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "TaskService.existsById() is not working" });
  }
});

module.exports = TaskController;
