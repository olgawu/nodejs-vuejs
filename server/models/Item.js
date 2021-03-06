//定义模型

const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name:{type:String},
    // 不加parents不会存到数据库 ref表示他关联的是哪个模型 这里是他本身 
    // parent:{type:mongoose.SchemaTypes.ObjectId,ref:'Item'}   
    icon:{type:String}   //把图片上传到地址
  
  
})
//导出模型
module.exports=mongoose.model('Item',schema)