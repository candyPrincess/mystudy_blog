const handleGetArticleAdd = (req,res) => {
    //在渲染这个页面之前需要判断是否登录了,如果没有登录,返回请登录
    if(!req.session.isLogin) return console.log("请登录")
    res.render("./article/add.ejs",{
        user:req.session.user,
        isLogin:req.session.isLogin
    })
}
module.exports = {
    handleGetArticleAdd
}
