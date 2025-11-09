const db=require('../db/index');
const bcrypt=require('bcryptjs');

exports.getuserinfo=(req,res)=>{
    const sqlstr='select id,username,nickname,email,user_pic from ev_user where id=?';     
    db.query(sqlstr,req.user.id,(err,results)=>{
        if(err){
            return res.cc(err);
        }    
        if(results.length!==1){
            return res.cc('获取用户信息失败！');
        }
        res.send({
            status:0,
            message:'获取用户信息成功！',
            data:results[0],
        })
});
}

exports.updateuser=(req,res)=>{
    const sqlstr='update ev_user set ? where id=?';
    db.query(sqlstr,[req.body,req.body.id],(err,results)=>{
        if(err) return res.cc(err);
        if(results.affectedRows!==1){
            return res.cc('更新用户信息失败！');
        }
            res.send('ok');
    })

}

exports.updatepwd = (req, res) => {

  const sqlstr = 'select * from ev_user where id = ?';
  db.query(sqlstr, [req.user.id], (err, results) => { // 单个参数用数组包裹
    if (err) return res.cc(err);
    if (results.length !== 1) {
      return res.cc('用户不存在！');
    }

    // 2. 验证原密码
    const compareResult = bcrypt.compareSync(req.body.oldpwd, results[0].password);
    if (!compareResult) {
      return res.cc('原密码错误！');
    }

    const sqlstr2 = 'update ev_user set password = ? where id = ?';
    const newpwd = bcrypt.hashSync(req.body.newpwd, 10);   //对新密码加密
    
    db.query(sqlstr2, [newpwd, req.user.id], (err, results) => {
      if (err) return res.cc(err);
      if (results.affectedRows !== 1) {
        return res.cc('更新密码失败！');
      }
      res.cc('更新密码成功！', 0);
    });
  });
};

//  req.user.id（从 Token 获取的用户 ID）    req.body.id（前端传递的 ID）