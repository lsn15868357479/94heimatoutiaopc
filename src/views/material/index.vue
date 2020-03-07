<template>
<!-- el-card布局 -->
   <el-card>
        <!-- 放置面包屑  将 面包屑给到卡片的具名header-->
        <bread-crumb slot='header'>
            <!-- 具名插槽 template不生成任何实质标签-->
            <template slot='title'>
                素材管理
            </template>
        </bread-crumb>
        <!-- 放置一个上传的组件 -->
        <el-row type='flex' justify="end">
          <!-- 上传组件要求必须传action属性 不传就会报错 可以给一个空字符串 show-file-list 是否显示已上传文件列表-->
          <el-upload :show-file-list="false" :http-request="uploadImg" action="">
           <el-button size="small" type='primary'>上传素材</el-button>
           <!-- 传入一个内容 点击内容就会传出上传文件框 -->
          </el-upload>
        </el-row>

        <!-- {{activeName}} -->
        <!-- 放置标签页 -->
          <!-- 放置标签页 v-model所绑定的值 就是当前所激活的页签 切换tabs页签的时候 需要 进行事件的监听-->
        <el-tabs v-model="activeName" @tab-click="changeTab">
              <!-- 放置标签 label表示标签显示的名称 name代表页签的选中的值-->
                 <el-tab-pane label="全部素材" name='all'>
                <!-- 内容 循环生成页面结构 -->
                <div class='img-list'>
                    <!-- 采用v-for对list数据进行循环 -->
                    <el-card class='img-card' v-for="(item,index) in list" :key="item.id">
                        <!-- 放置图片 并且赋值 图片地址-->
                        <img :src="item.url" alt="" @click="selectImg(index)">
                        <!-- 操作栏 可以flex布局-->
                        <el-row class='operate' type='flex' align="middle" justify="space-around">
                           <i class='el-icon-star-on' @click="collectOrCancel(item)" :style="{color: item.is_collected ? 'red' : 'black'}"></i>
                           <i class='el-icon-delete-solid' @click="delMaterial(item)"></i>
                        </el-row>
                    </el-card>
                </div>
            </el-tab-pane>
            <el-tab-pane label="收藏素材" name='collect'>
                <!-- 内容 -->
                  <div class='img-list' >
                    <!-- 采用v-for对list数据进行循环 -->
                    <el-card class='img-card' v-for="(item,index) in list" :key="item.id">
                        <!-- 放置图片 并且赋值 图片地址-->
                        <img :src="item.url" alt="" @click="selectImg(index)">
                    </el-card>
                </div>
            </el-tab-pane>
        </el-tabs>
        <!-- 放置一个公共的分页组件 -->
        <el-row type="flex" justify="center" style="height:80px" align="middle">
                  <!-- 放置分页组件
              total  总条数
              current-page 当前页码
              page-size 每页多少条
              监听 分页的组件的切换事件
            -->
                <el-pagination background
                :total="page.total"
                :current-page="page.currentPage"
                :page-size="page.pageSize"
                layout="prev,pager,next"
                @current-change="changePage"
                ></el-pagination>
        </el-row>
        <!-- 放置一个el-dialog在组件 通过visible属性true false进行设置 -->
        <el-dialog openend="openEnd" :visible="dialogvisible" @close="dialogvisible=false">
           <!-- 放置走马灯 -->
           <el-carousel ref="myCarousel" indicator-position="outside" heingt="400px">
           <!-- 放置幻灯片循环项 -->
           <el-carousel-item v-for="item in list" :key="item.id">
             <!-- 放置图片 -->
             <img style="width:100%;height:100%" :src="item.url" alt="">
           </el-carousel-item>
           </el-carousel>
        </el-dialog>
     </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all', // 当前激活的标签
      list: [], // 接收全部素材
      page: {
        currentPage: 1, // 默认第一页
        total: 0, // 当前总数
        pageSize: 2 // 每页多少条
      }, // 专门的对象存放分页信息
      dialogvisible: false, // 控制在哪上隐藏
      clickIndex: -1// 点击的索引
    }
  },
  methods: {
    openEnd () {
      this.$refs.myCarousel.setActiveItem(this.clickIndex)
    },
    // 点击图片是调用
    selectImg (index) {
      this.clickIndex = index// 讲索引赋值
      this.dialogvisible = true// 打开索引
    },
    // 删除素材的方法
    delMaterial (row) {
      // 删除之前询问一下
      // confirm也是promise
      this.$confirm('确定要删除当前图片吗', '提示').then(() => {
        this.$axios({
          method: 'delete', // 请求类型
          url: `/user/images/${row.id}` // 请求地址
        }).then(() => {
        // 成功了之后
          this.getMaterial()// 重新加载数据
        }).catch(() => {
          this.$message.error('删除失败')
        })
      })
    },
    // 取消或者收藏素材
    collectOrCancel (row) {
      //  调用收藏或取消接口
      this.$axios({
        method: 'put', // 请求类型
        url: `/user/images/${row.id}`, // 请求地址
        data: {
          collect: !row.is_collected // true  or false  ?  取反 因为 收藏 => 取消收藏 没收藏  => 收藏
        }// 放置body参数
      }).then(() => {
        // 成功了之后
        this.getMaterial()// 重新加载数据
      }).catch(() => {
        this.$message.error('收藏失败')
      })
    },
    // 定义一个上传组件的方法
    uploadImg (params) {
      // params.file就是需要上传的图片文件
      // 接口测试类型要求是formData
      const data = new FormData()// 实例化一个formData对象
      data.append('image', params.file)// 加入文件
      this.$axios({
        url: '/user/images', // 请求地址
        method: 'post',
        data
      }).then(() => {
        // 如果成功了 应该重新获取数据
        this.getMaterial()
      }).catch(() => {
        this.$message.error('上传失败')
      })
    },
    // 该方法汇总页码切换时执行
    changePage (newPage) {
      this.page.currentPage = newPage // 将新页码赋值给也吗数据
      this.getMaterial()// 读取数据
    },
    //   获取素材数据
    getMaterial () {
      this.$axios({
        url: '/user/images', // 请求地址
        params: {
          collect: this.activeName === 'collect', //  这个位置应该变活 根据当前的页签变活   activeName === 'all' 获取所有的素材  activeName = 'collect' 获取收藏素材
          page: this.page.currentPage, // 取页码变量中的值 因为只要页码变量一变 获取的数据跟着变
          per_page: this.page.pageSize // 获取每页数量
        }, // get参数 也就是query参数
        data: {} // data参数 放的是body参数
      }).then(result => {
        // 将返回的数据 赋值到data中的数据
        this.list = result.data.results
        // 将总条数赋值给total
        this.page.total = result.data.total_count// 总数 全部素材的总数 收藏素材的总数
      })
    },
    // 切换页签事件
    changeTab () {
      this.page.currentPage = 1// 将页码重置为第一页 因为分类变了 数据变了
      // 在切换事件中
      // 可以根据当前 activeName来决定是获取哪个方面 的数据
      // activeName === 'all' 获取所有的素材  activeName = 'collect' 获取收藏素材
      this.getMaterial() // 直接调用获取素材的方法
    }
  },
  created () {
    // 实例化之后 调用获取素材数据
    this.getMaterial() // 获取素材数据
  }
}
</script>

<style lang='less' scoped>
  .img-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      .img-card {
          width: 220px;
          height: 240px;
          margin: 20px 40px;
          position: relative;
          img {
              width: 100%;
              height: 100%;
          }
          .operate {
              position: absolute;
              left:0;
              bottom:0;
              width: 100%;
              background: #f4f5f6;
              height: 30px;
              i  {
                  font-size:20px;
              }
          }
      }
  }
</style>
