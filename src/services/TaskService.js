const TaskRepository = require("../repositories/TaskRepository");

const index = async () => {
  return await TaskRepository.findAll();
};

const indexByStatus = async (status) => {
  return await TaskRepository.findAllByStatus(status);
};

const show = async (id) => {
  return await TaskRepository.findTaskById(id);
};

const store = async ({ user_id, title, description, status }) => {
  return await TaskRepository.save({ user_id, title, description, status });
};

const existsById = async (id) => {
  const response = await TaskRepository.findById(id);
  return response ? true : false;
};

const destroy = (id) => {
  TaskRepository.remove(id);
};

const update = async ({ id, title, description, status, created_at }) => {
  return await TaskRepository.update({
    id,
    title,
    description,
    status,
    created_at,
  });
};

const updateStatus = async ({ status, id }) => {
  await TaskRepository.updateStatus({ status, id });
};

module.exports = {
  index,
  indexByStatus,
  show,
  store,
  existsById,
  destroy,
  update,
  updateStatus,
};
