
const mysql = require("mysql")
//配置数据库
const conn = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"mystudy_blog"
})

module.exports = conn