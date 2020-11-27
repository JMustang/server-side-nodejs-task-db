const Database = require("../config/Database");

const insertRelationUserRoles = async (userId, roleId) => {
  await Database.query(
    `
    insert into user_roles (
        user_id, role_id
    ) values (
        $1, $2
    )`,
    [userId, roleId]
  );
};

module.exports = {
  insertRelationUserRoles,
};
