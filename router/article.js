//监听文章的路由
const express = require("express")
const router = express.Router()

const control = require("../controller/article.js")
router.get("/article/add",control.handleGetArticleAdd)

router.post("/article/add",control.handlePostArticleAdd)

// 监听发表文章后的详情页面
router.get("/article/info/:id",control.handleGetArticleInfo)

//请求文章编辑页面
router.get("/article/edit/:id",control.handleGetArticleEdit)

//提交要编辑的文章的信息
router.post("/article/edit/:id",control.handlePostArticleEdit)



module.exports = router