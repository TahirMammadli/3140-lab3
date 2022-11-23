const {Client} = require('pg')

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "runthejewels77",
    database: "squirrel_project"
})




module.exports = client