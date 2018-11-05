const express = require("express")
const app = express()

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

app.listen(80,() => {
    console.log("running at http://127.0.0.1")
})