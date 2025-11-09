const express= require('express');
const router=express.Router();
const expressjoi =require('@escook/express-joi');  //导入数据验证中间件
const {update_userinfo_schema}=require('../schema/index');   //导入需要的验证规则对象
const userinfoHandler=require('../router-handle/userinfo');
const {update_password_schema}=require('../schema/index');
router.get('/userinfo',userinfoHandler.getuserinfo)
router.post('/updateuser',expressjoi(update_userinfo_schema),userinfoHandler.updateuser)
router.post('/updatepwd',expressjoi(update_password_schema),userinfoHandler.updatepwd)
module.exports=router;

