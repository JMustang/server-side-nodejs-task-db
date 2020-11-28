const Database = require("../config/Database");

const findAll = async () => {
  const response = await Database.query(`
    select id, active, name, email, created_at, updated_at from users order by id
  `);

  return response.rows;
};

const findByEmail = async (email) => {
  const response = await Database.query(
    `
        select id from users where email = $1
    `,
    [email]
  );

  return response.rows;
};

const insertUser = async ({ active, name, email, password }) => {
  const response = await Database.query(
    `
    insert into users (
        active, name, email, password, created_at, updated_at
    ) values (
        $1, $2, $3, $4, current_timestamp, current_timestamp
    )returning id, active, name email, created_at, updated_at
    `,
    [active, name, email, password]
  );

  return response.rows[0];
};

module.exports = {
  findAll,
  findByEmail,
  insertUser,
};
