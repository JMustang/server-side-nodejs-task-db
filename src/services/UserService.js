const UserRepository = require("../repositories/UserRepository");
const RoleRepository = require("../repositories/RoleRepository");
const UserRoleRepository = require("../repositories/UserRoleRepository");
const bcrypt = require("bcryptjs");

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

module.exports = {
  existEmail,
  store,
};
