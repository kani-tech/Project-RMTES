const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "dan178",
    database: "item_database",
    host: "localhost",
    port: 5432
})

module.exports = pool