const UserRepository = require("../repositories/UserRepository");
const RoleRepository = require("../repositories/RoleRepository");
const UserRoleRepository = require("../repositories/UserRoleRepository");
const RoleService = require("../services/RoleService");
const bcrypt = require("bcryptjs");

const index = async () => {
  let users = await UserRepository.findAll();

  for (let i = 0; i < users.length; i++) {
    users[i].roles = await RoleService.findRoleByEmail(users[i].email);
  }

  return users;
};

const existEmail = async (email) => {
  const response = await UserRepository.findByEmail(email);
  return response.length > 0 ? true : false;
};

const store = async ({ active, name, email, password, roles }) => {
  const userInserted = await UserRepository.insertUser({
    active,
    name,
    email,
    password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
  });

  for (let i = 0; i < roles.length; i++) {
    const roleId = await RoleRepository.findRoleIdByRole(roles[i].role);
    await UserRoleRepository.insertRelationUserRoles(userInserted.id, roleId);
  }
};

const findUserByEmail = async (email) => {
  let user = await UserRepository.findUserByEmail(email);

  if (user) {
    user.roles = await RoleRepository.findRoleByEmail(email);
  }

  return user;
};

const validatePassword = async (a, b) => {
  return await bcrypt.compare(a, b);
};

module.exports = {
  index,
  existEmail,
  store,
  findUserByEmail,
  validatePassword,
};
