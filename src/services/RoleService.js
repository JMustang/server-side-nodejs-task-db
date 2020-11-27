const RoleRepository = require("../repositories/RoleRepository");

const existRole = async (roles) => {
  const response = await RoleRepository.findAll();

  for (let i = 0; i < roles.length; i++) {
    let existRoleFlag = false;
    for (let j = 0; j < response.length; j++) {
      if (roles[i].role === response[j].role) {
        existRoleFlag = true;
        break;
      }
    }
    if (existRoleFlag) {
      return true;
    }
  }
  return false;
};

module.exports = {
  existRole,
};
