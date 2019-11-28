<template>
    <div>
        <h1>分类列表</h1>
         <el-table :data="items">
        <el-table-column prop="_id" label="ID" width="240"></el-table-column>
         <el-table-column prop="parent.name" label="上级分类"></el-table-column>
        <el-table-column prop="name" label="分类名称"></el-table-column>
         <el-table-column
      fixed="right"
      label="操作"
      width="180">
      <template  slot-scope="scope">
        <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
                                                                        <!-- 模板字符串拼接 scope.row当前那一行的id-->
        <el-button type="text" size="small" @click="$router.push(`/categories/edit/${scope.row._id}`)">编辑</el-button>
        <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button> 
                                                                   <!-- 传整个一行的数据 -->
      </template>
    </el-table-column>
        
      </el-table>
    </div>
</template>
<script>
export default {
    data(){
        return {
            items:[]
        }
    },
    created() {  //默认进来要做什么
    this.fetch()  //自动执行fetch
        
    },
    methods: {
        //拉取数据
        async fetch(){
            const res = await this.$http.get('rest/categories')
            this.items = res.data
    },
    //删除的方法
    async remove(row){
        this.$confirm(`是否继续确定要删除分类"${row.name}"`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
            //请求接口 先写接口
            const res =await this.$http.delete(`rest/categories/${row._id}`) // eslint-disable-line no-unused-vars
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          //删除成功之后重新获取数据
          this.fetch()
        })
    }
}
}
</script>