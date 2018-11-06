
const handleGetIndex = (req,res) => {
    //render渲染必须要配置ejs模板引擎
    //将从客户端接收过来的用户信息存储到session中,将rsession中存储的信息传输到主页
    res.render("./index.ejs",{
        user:req.session.user,
        isLogin:req.session.isLogin
    })
}
module.exports = {
    handleGetIndex
}

