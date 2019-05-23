const express = require('express')
const mysql = require('mysql')
// const session = require('express-session')



const db = mysql.createConnection({
  host:'localhost',
  user:'bri',
  password:'admin',
  database:'camp_test'
})


let router = express.Router()
router.use(express.urlencoded({ extended: false }));
router.use(express.json());
// router.use(session({
//   saveUninitialized: false,
//   resave: false,
//   secret: 'sdgdsf ;ldkfg;ld',
//   cookie: {
//       maxAge: 600000
//   }
// }));


//login


router.post('/login',(req,res)=>{
  const {account} = req.body
  console.log(account)
  let sql = 'SELECT * FROM member_list'
  let query = db.query(sql,(err,members)=>{
    if(err) throw err
    const user = members.find(member=>member.mem_account===account)
    if(user){
      req.session.regenerate(function(err) {
        if(err){
        return res.json({ret_code: 2, ret_msg: '登入失敗'});        
        }
        req.session.user  =  user
        res.json({ret_code: 0, ret_msg: '登入成功'});              
        });
        }else{
        res.json({ret_code: 1, ret_msg: '賬號或密碼錯誤'});
        }  
        
  })

})

router.get('/obtaincoupon',(req,res)=>{
  res.send(req.session)
})



module.exports = router

