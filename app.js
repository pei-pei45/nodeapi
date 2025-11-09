const express = require('express');
const app = express();
const joi = require('joi');
const config =require('./confij');
const expressJoi =require('@escook/express-joi');
const expressJWT = require('express-jwt')
app.use(
  expressJWT({
    secret: config.jwtSecretKey,
    algorithms: ['HS256']  // 6.x 版本添加此参数可避免警告
  }).unless({ path: [/^\/user\//] })
);

const cors=require('cors');
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use((req,res,next)=>{
  res.cc=function(err, status=1){
      res.send({
          status,
          message:err instanceof Error ? err.message : err
      });
  } 
  next();
} )
app.use(function (err, req, res, next) {
    if (err instanceof joi.ValidationError) {
        return res.cc(err)
        res.cc(err)
    }
    if(err.name==='UnauthorizedError'){
        return res.cc('身份认证失败！')
    }
  })

const userRouter=require('./router/user');
app.use('/user', userRouter);

const userinfoRouter=require('./router/userinfo');
app.use('/my', userinfoRouter);

app.listen(3000, () => {
    console.log(`Server running at http://127.0.0.1:3000`); 
} );