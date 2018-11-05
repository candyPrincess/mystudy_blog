const express = require("express")
const app = express()
const bodyParser = require("body-parser")
// 对body-parser进行配置,才会有req.body这个数据对象
app.use( bodyParser.urlencoded({extended: true}) )

//获取添加的时间
const moment = require("moment")

const mysql = require("mysql")
//配置数据库
const conn = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"mystudy_blog"
})

// 配置ejs模板引擎
app.set("view engine","ejs")
//渲染页面的路径都以这里的目录为参考
app.set("views","./views")

//静态托管资源
app.use("/node_modules",express.static("./node_modules"))

app.get("/",(req,res) => {
    //render渲染必须要配置ejs模板引擎
    res.render("./index.ejs",{name:"zs"})
})

//当点击注册的时候,拿到user下面的register
app.get("/register",(req,res) => {
    res.render("./user/register.ejs",{})
})
//当点击登录的时候跳转到登录页面
app.get("/login",(req,res) => {
    res.render("./user/login.ejs",{})
})


//注册用户
//接收前端传来的数据,并向服务器查询数据,需要注册body-parser
app.post("/register",(req,res) => {
    const user = req.body
    console.log(user);
     //判断昵称是否为空
    if(user.username.trim().length === 0 || user.password.trim().length === 0 || user.nickname.trim().length === 0) return res.status(501).send({status:501,msg:"请填写完整用户信息,请重试",data:null})
    
    //判断昵称是否重复,查询接收的用户名是否与数据库有同一条,判断数量
    const checkSql = "select count(*) as count from users where username = ?"
    conn.query(checkSql,user.username,(err,result) => {
        if(err) return res.status(503).send({status:503,msg:err.message,data:null})
        // console.log(result) //[ RowDataPacket { count: 1 } ] 有1条以上数据,说明重复
        if(result[0].count !== 0) return res.status(400).send({status:400,msg:"用户名重复,请重试",data:null})

        //获取添加的时间moment
        user.ctime = moment().format("YYYY-MM-DD HH-mm-ss")
        //否则没有重复数据,执行sql语句,添加到数据库
        const addSql = "insert into users set ?"       
        conn.query(addSql,user,(err,result) => {
            if(err) return res.status(401).send({status:401,msg:err.message,data:null})
            // console.log(result)
            if(result.affectedRows !== 1) res.status(402).send({status:402,msg:"注册新用户失败,请重试"})
            res.send({status:200,msg:"ok"})
        })
    })   
})


//登录用户
app.post("/login",(req,res) => {
    // 获取到用户登录时提交的信息
    const user = req.body
    console.log(user);
    //查询用户名和密码与数据表是否一致
    const sql = "select * from users where username = ? and password = ?"
    conn.query(sql,[user.username,user.password],(err,result) => {
        if(err) return res.status(500).send({status:500,msg:err.message})
        // console.log(result);查询数据只要有一条数据,查询成功,说明重复用户名或者密码.不为1.说明查询失败
        if(result.length !== 1) return res.status(501).send({status:501,msg:"用户查询失败"})
        res.send({status:200,msg:"用户名匹配,登录成功"})
    })

})


app.listen(80,() => {
    console.log("running at http://127.0.0.1")
})