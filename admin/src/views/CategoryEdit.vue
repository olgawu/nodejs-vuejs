<template>
  <div class="about">
    <h1>{{id?'编辑':'新建'}}分类</h1>
    <el-form label-width='120px' @submit.native.prevent="save">
      <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <el-option 
      v-for="item in parents" 
      :key='item._id' 
      :label="item.name"
      :value="item._id">
      </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type='primary' native-type='submit'>保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  props:{ //接收id
    // 和路由尽可能解耦 
    id:{}
  },
  data() {
    return {
      model:{

      },
      parents:[]
    
    }
  },
  methods: {
   async save(){   //新建和修改并存在一个方法
      let res   // eslint-disable-line no-unused-vars
      if(this.id){
       res = await this.$http.put(`rest/categories/${this.id}`,this.model)
      }else{
        res = await this.$http.post('rest/categories',this.model)
      }
     
     this.$router.push('/categories/list')
     this.$message({
       type:'success',
       message:'保存成功'
     })
    },
    async fetch(){
      const res = await this.$http.get(`rest/categories/${this.id}`) 
      this.model = res.data
    },
    async fetchParents(){  //用于显示父级数据
      const res = await this.$http.get(`rest/categories`)  // eslint-disable-line no-unused-vars
      this.parents=res.data

    }
  },
  created() {
     this.fetchParents() 
    //前面条件满足之后才执行后面方法
    this.id && this.fetch()
   
  },
}
</script>
<style lang="">
  
</style>
