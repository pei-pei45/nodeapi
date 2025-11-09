const joi =require('joi')
const username =joi.string().alphanum().min(3).max(30).required()
const password =joi.string().pattern(/^[\S]{3,12}$/).required()
const id=joi.number().integer().min(1).required()
const nickname=joi.string().required()
const email=joi.string().email().required() 
exports.reg_login_schema={
    body:{
        username,
        password,
    },
}

exports.update_userinfo_schema={
    body:{
        id, 
        nickname,
        email
    }
} 

exports.update_password_schema={
    body:{
        oldpwd:password,
        newpwd:joi.not(joi.ref('oldpwd')).concat(password), 
    }
    }