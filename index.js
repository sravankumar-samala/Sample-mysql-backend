import express from 'express'
import { createPool } from 'mysql';
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = process.env.APP_PORT || 5017;
const { DB_PORT, DB_HOST, MYSQL_DB, DB_USER, DB_PASS } = process.env
console.log(DB_HOST, DB_PORT)

const pool = createPool({
    host: DB_HOST,
    port: DB_PORT,
    database: MYSQL_DB,
    user: DB_USER,
    password: DB_PASS,
    connectionLimit: 10,
})

app.get('/', (req, res) => res.send('Hey there!'))

app.listen(port, () => {
    console.log(`Running on port ${port}`)
})

app.get('/products', (req, res) => {
    const sqlQuery = `SELECT * FROM roxilers_products;`

    pool.query(sqlQuery, (err, result) => {
        if (err) return console.log(err);
        res.send(result);
    })
})
