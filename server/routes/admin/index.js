//具体的路由 接收app对象  定义了通用的接口方便后续操作
module.exports=app=>{
    const express = require('express')
    //express的子路由
    const router = express.Router({
        mergeParams:true
    })
    // const req.Model = require('../../models/req.Model')  一开始没法require
    //post方法 接口地址 改成动态参数
    router.post('/',async(req,res)=>{
     
    //把数据存进去  到index引入数据库
     const model = await req.Model.create(req.body)
     res.send(model)
    })
    router.put('/:id',async(req,res)=>{//通过id去找 找到再更新
        const model = await req.Model.findByIdAndUpdate(req.params.id,req.body)
        res.send(model)

    })
    router.delete('/:id',async(req,res)=>{//通过id去找 找到再更新
         await req.Model.findByIdAndDelete(req.params.id,req.body)
        res.send({
            success :true   //给客户端返回一个true
        })
        
    })
    // 分类列表
    router.get('/',async(req,res)=>{
        //转类名
        // const modelName = require('inflection').classify(req.params.resource)      
        // const Model = require(`../../models/${modelName}`)
                              //parent需要特殊操作
        const queryOptions = {}
        if(req.Model.modelName === 'Category'){
            queryOptions.populate = 'parent'
        }                      
        const items = await req.Model.find().setOptions(queryOptions).limit(10)//限制数据条数 
        res.send(items)
    })
    router.get('/:id',async(req,res)=>{
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })
    //jia前缀   后面跟任意字符  
app.use('/admin/api/rest/:resource',async (req,res,next)=>{   //中间件 inflection
    const modelName = require('inflection').classify(req.params.resource)      
    req.Model = require(`../../models/${modelName}`)   //req上多挂载一个属性
    next()
},router)
const multer = require('multer')
const upload = multer({dest:__dirname + '/../../uploads'})   //文件存放位置
app.post('/admin/api/upload',upload.single('file'),async(req,res)=>{    //中间件multer
  const file = req.file    //加upload才有
  file.url = `http://localhost:3000/uploads/${file.filename}`
  res.send(file)
})
}