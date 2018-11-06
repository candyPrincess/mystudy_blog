const handleGetIndex = (req,res) => {
    //render渲染必须要配置ejs模板引擎
    res.render("./index.ejs",{})
}
module.exports = {
    handleGetIndex
}

