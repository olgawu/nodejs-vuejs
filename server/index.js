const express = require("express")

const app = express()

//中间件
app.use(express.json())
app.use(require('cors')())  //跨域模块
app.use('/uploads',express.static(__dirname + '/uploads'))  //托管静态文件

// 执行
require('./plugins/db')(app)
require('./routes/admin')(app)

app.listen(3000,()=>{
    console.log('接口监听成功')
})