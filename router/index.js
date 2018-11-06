//客户端路由
const express = require("express")
const router = express.Router()

const control = require("../controller/index.js")
router.get("/",control.handleGetIndex)

module.exports = router