const express = require("express")
const app = express()
const fs = require("fs")
const path = require("path")
const bodyParser = require("body-parser")
// 对body-parser进行配置,才会有req.body这个数据对象
app.use( bodyParser.urlencoded({extended: true}) )

// 引入session模块
const session = require("express-session")
//使用这个中间件,只要注册了这个中间件,就有req这个对象,就一定能访问req.session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
  }))


// 配置ejs模板引擎
app.set("view engine","ejs")
//渲染页面的路径都以这里的目录为参考
app.set("views","./views")

//静态托管资源
app.use("/node_modules",express.static("./node_modules"))


//导入router/index.js模块
// const router1 = require("./router/index.js")
// app.use(router1)

// //导入router/users.js模块
// const router2 = require("./router/users.js")
// app.use(router2)

//读取文件
fs.readdir("./router",(err,filename) => {
    if(err) return console.log("读取文件失败")
    filename.forEach(values => {
        // console.log(values)
        // console.log(path.join(__dirname,"./router/",values))
        const router = require(path.join(__dirname,"./router/",values))
        app.use(router)
    })
})

app.listen(80,() => {
    console.log("running at http://127.0.0.1")
})