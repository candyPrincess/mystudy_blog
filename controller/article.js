const moment = require("moment")
const conn = require("../db/db.js")
const marked = require("marked")

const handleGetArticleAdd = (req,res) => {
    //在渲染这个页面之前需要判断是否登录了,如果没有登录,返回请登录
    if(!req.session.isLogin) return res.redirect("/")
    res.render("./article/add.ejs",{
        user:req.session.user,
        isLogin:req.session.isLogin
    })
}

//监听一个add页面提交数据的路由处理函数,添加新文章到数据库
const handlePostArticleAdd = (req,res) => {
    // console.log(req.body) 获取提交过来的数据
    const body = req.body
    // 作者的id
    // body.authord_id = req.session.user.id
    const addSql = "insert into articles set ?"
    body.ctime = moment().format("YYYY-MM-DD HH-mm-ss")
    conn.query(addSql,body,(err,result) => {
        if(err) return res.send({status:500,msg:"查询失败,请重试"})
        if(result.affectedRows != 1) return res.send({status:500,msg:"查询失败,请重试"})
        res.send({status:200,msg:"ok",insertId:result.insertId})
    })
}

// 渲染新增的文章详情,将新增的文章信息渲染到info页面,首先要去数据库查询这个页面
const handleGetArticleInfo = (req,res) => {
    //需要文章标题,文章内容
    const id = req.params.id
    // console.log(req.params)
    const NewAddSql = "select * from articles where id = ?"
    conn.query(NewAddSql,id,(err,result) => {
        // console.log(result)
        if(err) return res.send({status:500,msg:"查询失败"})
        if(result.length != 1) return redirect("/")
        // 将文章内容渲染成maked语法
        const html = marked(result[0].content)
        result[0].content =html
        res.render("./article/info.ejs",{
            user:req.session.user,
            isLogin:req.session.isLogin,
            result:result[0]
        })
        
    })
   
    
}

//请求文章编辑页面
const handleGetArticleEdit = (req,res) => {
    // console.log(req.session)
    const id = req.params.id
    if(!req.session.isLogin) return res.redirect("/")
    const sql = "select * from articles where id = ?"
    conn.query(sql,id,(err,result) => {
        if(err) return res.send({status:500,msg:"查询失败,请重试"})
        if(result.length !== 1) res.redirect("/")
        // console.log(result[0])
        res.render("./article/edit.ejs",{
            user:req.session.user, 
            isLogin:req.session.isLogin,
            article:result[0]
        })
    })
   
}

//提交已经编辑的文章,并更新之前的文章的
const handlePostArticleEdit = (req,res) => {
    console.log(req.body)
    const id = req.params.id
    console.log(id)
    const sql = "update articles set ? where id = ?"
    conn.query(sql,[req.body,id],(err,result) => {
        console.log(result)
        if(err) return res.redirect("/")
        if(result.affectedRows != 1) return res.redirect("/")   
        res.send({status:200,msg:"提交成功"})
    })
    

}



module.exports = {
    handleGetArticleAdd,
    handlePostArticleAdd,
    handleGetArticleInfo,
    handleGetArticleEdit,
    handlePostArticleEdit
}
