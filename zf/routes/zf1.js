const express = reqiure('express')
const router = express.Router()
const zfUtils = require('../zfUtils')
router.get('/login',(req,res)=>{
    res.render('login',{title:'教务系统登录'})
})

router.get('/vcode',(req,res)=>{
    zfUtils.getViewstate((viewstate)=>{
        req.session.viewstate = viewstate
        zfUtils.getVcode((cookie,imgData)=>{
            req.sesion.cookie = cookie
            res.send(Buffer.from(imgData,'binary'))
        })
    })
})

router.post('/login',(req,res)=>{
    Object.assign(req.session,req.body)
    zfUtils.login(req.session,(result)=>{
        if(result){
            const someurl = 'https://jwc.gdmec.edu.cn/xsxk.aspx?xh=07190505&xm=%B3%C2%CA%E7%E2%F9&gnmkdm=N121205'
            zfUtils.getUrl(req.session.user,someurl,(str)=>{
                res.send(str)
            })
     }else{
        res.send('登陆失败')
    }   
    });
})

module.exports = router