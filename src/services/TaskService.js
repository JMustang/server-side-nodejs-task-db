const TaskRepository = require("../repositories/TaskRepository")

const index = async () => {
    return await TaskRepository.findAll()
}

module.exports = { index }