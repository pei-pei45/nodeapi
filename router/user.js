const express = require('express');
const router = express.Router();

const expressjoi =require('@escook/express-joi');  //导入数据验证中间件
const {reg_login_schema}=require('../schema/index');   //导入需要的验证规则对象

const userHandler = require('../router-handle/user');
router.post('/register',expressjoi(reg_login_schema), userHandler.reguser);
router.post('/login',expressJoi(reg_login_schema) ,userHandler.login );

module.exports = router;