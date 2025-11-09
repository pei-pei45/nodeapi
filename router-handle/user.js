const db=require('../db/index');
const bcrypt=require('bcryptjs');
const jwt =require('jsonwebtoken');
const config =require('../confij');

exports.reguser=(req,res)=>{
const userinfo=req.body;
if(!userinfo.username||!userinfo.password){
    return res.send({status:1,message:'用户名或密码不能为空！'});
    }

const sqlstr='select * from ev_user where username=?';
db.query(sqlstr,userinfo.username,(err,results)=>{
    if(err){
      res.cc(err);
    }
    if(results.length>0){
        // return res.send({status:1,message:'用户名被占用，请更换其他用户名！'});
        res.cc('用户名被占用，请更换其他用户名！')
    }
      userinfo.password=bcrypt.hashSync(userinfo.password,10); //提高密码安全性
      const  sqlstr1 = 'insert into ev_user set ?'
        db.query(sqlstr1,{username:userinfo.username,password:userinfo.password},(err,results)=>{   
            if(err){
               res.cc(err);
            }
            if(results.affectedRows!==1){
               
                res.cc('注册用户失败，请稍后再试！');
            }
            res.send({status:0,message:'注册成功'});
        });
 });
    //  res.send('User registration endpoint');
};
 exports.login=(req,res)=>{
    const userinfo=req.body;
    const sqlstr='select * from ev_user where username=?';
    db.query(sqlstr,userinfo.username,(err,results)=>{
        if(err){
           return res.cc(err);
        }   
        if(results.length!==1){
              return res.cc('登录失败！');
        }
    const compareResult=bcrypt.compareSync(userinfo.password,results[0].password);  
    // 若密码是明文（如 123456）或用其他方式加密（如 MD5），bcrypt.compareSync 会比对失败。
    if(!compareResult){
        return res.cc('登录失败！');
    }
    // res.send('登录成功');

    const user={ ...results[0],password:'',user_pic:'' }; //剔除 密码 和 头像 字段
    const tokenStr=jwt.sign(user,config.jwtSecretKey,{expiresIn:config.expiresIn});
    res.send({
        status:0,
        message:'登录成功！',
        token:'Bearer '+tokenStr,
    });

 })
}