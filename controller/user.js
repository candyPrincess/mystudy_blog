//获取添加的时间
const moment = require("moment")

const conn = require("../db/db.js")


const handleGetRegister = (req,res) => {
    res.render("./user/register.ejs",{})
}
const handleGetLogin = (req,res) => {
    res.render("./user/login.ejs",{})
}
const handlePostRegister = (req,res) => {
    const user = req.body
    // console.log(user);
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
} 
const handlePostLogin = (req,res) => {
    // 获取到用户登录时提交的信息
    const user = req.body
    // console.log(user);
    //查询用户名和密码与数据表是否一致
    const sql = "select * from users where username = ? and password = ?"
    conn.query(sql,[user.username,user.password],(err,result) => {
        // console.log(err)
        if(err) return res.status(500).send({status:500,msg:err.message})
        // console.log(result);查询数据只要有一条数据,查询成功,说明重复用户名或者密码.不为1.说明查询失败
        if(result.length !== 1) return res.status(501).send({status:501,msg:"用户查询失败"})
        //如果登录成功,需要先储存登录的信息到session里面
        // console.log(req.session)
        // console.log(result[0]);
        //将user和isLogin属性挂在req.session上
        req.session.user = result[0]
        req.session.isLogin = true 
        res.send({status:200,msg:"用户名匹配,登录成功"})
    })

}

//注销模块
const handleGetLogout = (req,res) => {
    //注销session,req.session.destory
    req.session.destroy(function(){
        res.redirect("/")
    })
}



module.exports = {
    handleGetRegister,
    handleGetLogin,
    handlePostRegister,
    handlePostLogin,
    handleGetLogout
}