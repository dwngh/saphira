import mysql from 'mysql';
import * as dotenv from 'dotenv'
dotenv.config();

//local mysql db connection
export const connection = mysql.createConnection({
    host     : process.env.HOST,
    port     : process.env.DB_PORT,
    user     : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD,
    database : process.env.DATABASE,
});

connection.connect(function(err) {
    if (err) throw err;
});
