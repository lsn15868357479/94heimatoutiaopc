<template>
<el-card v-loading="loading">
    <!-- 放置一个面包屑组件 slot='header' 表示面包屑会作为具名插槽给header部分 -->
<bread-crumb slot="header">
 <!-- slot='title' 表示 评论管理给面包些的插槽 -->
       <template slot="title">
           评论管理
       </template>
</bread-crumb>
<!-- 表格组件 -->
<!-- 使用el-table-column作为列 -->
<!-- prop表示显示的字段 label表示表头 -->
<el-table :data="list">
  <el-table-column prop="title" width="600"  label="标题"></el-table-column>
       <!-- 给el-table-column 一个formatter属性 用来格式化内容 因为table中不显示布尔值-->
       <el-table-column :formatter="formatterBool" prop="comment_status" label="评论状态"></el-table-column>
       <el-table-column  prop="total_comment_count" label="总评论数"></el-table-column>
       <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
       <el-table-column  label="操作">
         <!-- 作用域插槽 子组件中的数据 通过插槽传出slot-scope -->
          <!-- 可以放组件 -->
        <template slot-scope="obj">
          <el-button size="small" type='text'>修改</el-button>
          <el-button @click="openOrClose(obj.row)" size="small" type='text'>{{obj.row.comment_status ? '关闭' : '打开'}}评论</el-button>
        </template>
       </el-table-column>
</el-table>
 <!-- 放置分页插件 -->
<el-row style="height:80px" type="flex" align="middle" justify="center">
 <!-- 需要动态属性 -->

  <el-pagination background layout="prev,pager,next"
  :current-page="page.currentPage "
  :page-size="page.pageSize"
  :total="page.total"
  @current-change="changePage"
  ></el-pagination>
</el-row>

</el-card>
</template>

<script>
export default {
  data () {
    return {
      page: {
        total: 0, // 默认总数是0
        currentPage: 1, // 默认的页码
        pageSize: 10// 每页多少条
      },
      list: [],
      loading: false// 控制loading遮罩层的显示或隐藏
    }
  },
  methods: {
    // 页码改变事件
    changePage (newPage) {
      this.page.currentPage = newPage// 赋值最新页码
      // 重新拉取数据
      this.getComment()// 获取评论
    },
    //   获取评论数据
    async getComment () {
      this.loading = true// 打开遮罩层
      const result = await this.$axios({
        url: '/articles', // 请求地址
        // 接口不传分页数据 默认传第一页数据
        params: {
          response_type: 'comment', // 此参数用来控制获取数据类型
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
        // query参数应该在哪个位置传 axios
        // params 传get参数也就是query参数
        // data   传body参数也就是请求体参数
      })
      //  将返回结果的中 数组 给list
      this.list = result.data.results
      // 在获取玩数据之后 讲总数赋值给total
      this.page.total = result.data.total_count
      this.loading = false// 关闭遮罩层
    },
    //  定义一个格式化的函数
    formatterBool (row, column, cellValue, index) {
      //  row 代表当前的一行数据
      // column 代表当前的列信息
      // cellValue 代表当前单元格的值
      // index 代表当前的索引
      // 该函数需要返回一个值 用来显示
      return cellValue ? '正常' : '关闭'
    },
    async openOrClose (row) {
      // console.log(row)
      const mess = row.comment_status ? '关闭' : '打开'
      await this.$confirm(`是否确定${mess}评论`, '提示')
      try { //  调用打开或者关闭接口
        await this.$axios({
          url: '/comments/status', // 请求地址
          method: 'put',
          params: {
            article_id: row.id.toString()
          },
          data: {
            // body参数
            allow_comment: !row.comment_status // 是打开还是关闭  此状态和评论状态相反
          }
        })
        //  成功了 提示个消息 然后 重新拉取数据4
        this.$message.success(`${mess}评论成功`)
        //  重新拉取数据
        this.getComment() // 调用重新拉取数据的方法
      } catch (error) {
        //   表示失败了 会进入到catch
        this.$message.error(`${mess}评论失败`)
      }
    }
  },
  created () {
    //   在钩子函数中 直接获取数据
    this.getComment()
  }
}

</script>

<style>

</style>
