const Database = require("../config/Database")

const findAll = async () => {
    const response = await Database.query(
        `select * from tasks order by id`
    )
    return response.rows
}

const findTaskById = async (id) => {
    const response = await Database.query(
        `
    select * from tasks where id = $1
    `, [
        id
    ])
    return response.rows[0]
}

const save = async ({ title, description, status }) => {
    const response = await Database.query(`
    insert into tasks (
            title, description, status, created_at, updated_at
        ) values (
            $1, $2, $3, current_timestamp, current_timestamp
        ) returning *
    `, [
        title, description, status
    ])

    return response.rows[0]
}

const findById = async ( id ) => {
    const response = await Database.query(
        `
    select id from tasks where id = $1
    `, [
        id
    ])

    return response.rows[0]

}

const remove = (id) => {
    Database.query(
        `
        delete from tasks where id = $1
        `, [
            id
        ])
}

const update = async ({ id, title, description, status, created_at }) => {
    const response = await Database.query(
        `
        update tasks
        set title=$1, description=$2, status=$3, created_at=$4, updated_at=current_timestamp
        where id = $5 returning *
        `, [
            title, description, status, created_at, id
        ])

        return response.rows[0]
}

module.exports = { findAll, findTaskById, save, findById, remove, update }