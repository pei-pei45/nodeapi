const mysql=require('mysql2');
const db=mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'880288',
    database:'my-db-01'
});
module.exports=db;