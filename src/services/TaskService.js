const TaskRepository = require("../repositories/TaskRepository")

const index = async () => {
    return await TaskRepository.findAll()
}

const store = async ({ title, description, status }) => {
    return await TaskRepository.save({ title, description, status });
};

const existsById = async ( id ) => {
    const response = await TaskRepository.findById( id )
    return response ? true : false
}

const destroy = (id =>{
    TaskRepository.remove(id)
})

module.exports = { index, store, existsById, destroy }