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

module.exports = {
  findAll,
  findRoleIdByRole,
};
