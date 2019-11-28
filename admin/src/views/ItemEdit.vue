<template>
  <div class="about">
    <h1>{{id?'编辑':'新建'}}物品</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL + '/upload'"
          :show-file-list="false"
          :on-success="afterUpload"
     
        >
        <!-- 有图片就显示上传图片 没有就显示上传图标 -->
          <img v-if="model.icon" :src="model.icon" class="avatar" />  
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  props: {
    //接收id
    // 和路由尽可能解耦
    id: {}
  },
  data() {
    return {
      model: {
        icon:''
      },

    };
  },
  methods: {
    afterUpload(res){// eslint-disable-line no-unused-vars
         this.model.icon = res.url
   // this.$set(this.model,'icon','11111')  
    
    //明确告诉vue我们要在model上添加一个icon属性
   
    },
    async save() {
      //新建和修改并存在一个方法
      let res; // eslint-disable-line no-unused-vars
      if (this.id) {
        res = await this.$http.put(`rest/items/${this.id}`, this.model);
      } else {
        //存在数据库
        res = await this.$http.post("rest/items", this.model);
      }

      this.$router.push("/items/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/categories/${this.id}`);
      this.model = res.data;
    }
    
  },
  created() {
    //前面条件满足之后才执行后面方法
    this.id && this.fetch();
  }
};
</script>
<style>
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
