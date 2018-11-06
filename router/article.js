//监听文章的路由
const express = require("express")
const router = express.Router()

const control = require("../controller/article.js")
router.get("/article/add",control.handleGetArticleAdd)

module.exports = router