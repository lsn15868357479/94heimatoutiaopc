<template>
  <el-tabs v-model="activeName">
      <el-tab-pane label="素材库" name="material">
          <!-- 查询全部素材 -->
          <!-- v-for循环遍历list数据 -->
          <div class="select-image-list">
              <!-- 循环 -->
              <el-card v-for="item in list" :key="item.id" class="img-card">
                 <!-- 显示素材图片 -->
                 <img @click="clickImg(item.url)" :src="item.url" alt="">
              </el-card>
          </div>
          <!-- 分页 -->
          <el-row type="flex" justify="center" style="height:80px" align="middle">
           <!-- 分页组件 -->
           <el-pagination background layout="prev, pager, next"
               :total="page.total"
               :current-page="page.currentPage"
               :page-size="page.pageSize"
               @current-change="changePage"
               ></el-pagination>
          </el-row>
      </el-tab-pane>
      <el-tab-pane label="上传素材" name="upload">上传素材</el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'material', // 当前激活的变量
      page: {
        currentPage: 1, // 第几页
        pageSize: 8, // 每页多少条
        total: 0// 总条数
      }
    }
  },
  methods: {
    getAllImg () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: false, // 查询全部的素材 所以这里给一个false
          page: this.page.currentPage, // 当前页码
          per_page: this.page.pageSize // 每页多少条
        }
      }).then(result => {
        this.list = result.data.results// 获取全部素材数据
        this.page.total = result.data.total_count// 讲总数赋值给页码
      })
    },
    changePage (newPage) {
      this.page.currentPage = newPage
    },
    // 点击图片是触发
    //   需要将url参数传递给上层组件
    // 在脚手架中 自定义事件名 可以大小写通用 不用纯小写了
    clickImg (url) {
      this.$emit('selectOneImg', url)
    }
  },
  created () {
    this.getAllImg()
  }
}
</script>

<style lang="less" scoped>
.select-image-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .img-card {
        width: 150px;
        height: 150px;
        margin: 20px 0;
        img {
            width: 100%;
            height: 100%;
        }
    }
}
</style>
