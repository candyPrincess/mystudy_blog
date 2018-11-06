//创建用户路由
const express = require("express")
const router = express.Router()

const control = require("../controller/user.js")

//当点击注册的时候,拿到user下面的register
router.get("/register",control.handleGetRegister)

//当点击登录的时候跳转到登录页面
router.get("/login",control.handleGetLogin)


//注册用户
//接收前端传来的数据,并向服务器查询数据,需要注册body-parser
router.post("/register",control.handlePostRegister)


//登录用户
router.post("/login",control.handlePostLogin)


module.exports = router

