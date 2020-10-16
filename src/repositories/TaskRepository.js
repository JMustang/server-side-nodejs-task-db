const Database = require("../config/Database")

const findAll = async () => {
    const response = await Database.query(
        `select * from tasks order by id`
    )
    return response.rows
}

module.exports = { findAll }