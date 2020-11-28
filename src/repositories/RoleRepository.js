const Database = require("../config/Database");

const findAll = async () => {
  const response = await Database.query(`
        select * from roles
    `);

  return response.rows;
};

const findRoleIdByRole = async (role) => {
  const response = await Database.query(
    `
    select id from roles where role = $1 limit 1
    `,
    [role]
  );

  return response.rows[0].id;
};

const findRoleByEmail = async (email) => {
  const response = await Database.query(
    `
    select role from roles r
    inner join user_roles ur on r.id = ur.role_id
    inner join users u on u.id = ur.user_id
    where u.email = $1
  `,
    [email]
  );

  return response.rows;
};

module.exports = {
  findAll,
  findRoleIdByRole,
  findRoleByEmail,
};
