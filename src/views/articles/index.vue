<template>
  <el-card class="articles">
      <bread-crumb>
         <template slot="title">文章列表</template>
     </bread-crumb>
     <el-form style="padding-left:40px">
         <el-form-item label="文章状态">
             <!-- 放置单选框组 -->
             <el-radio-group v-model="searchForm.status">
                 <!-- 单选框选项 -->
                 <!-- 文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除，不传为全部 / 先将 5 定义成 全部 -->
                 <!-- :label的意思是后面值不会加引号 -->
                 <el-radio :label="5">全部</el-radio>
                 <el-radio :label="0">草稿</el-radio>
                 <el-radio :label="1">待审核</el-radio>
                 <el-radio :label="2">审核通过</el-radio>
                 <el-radio :label="3">审核失败</el-radio>
             </el-radio-group>
         </el-form-item>
         <el-form-item label="频道类型">
             <!-- 选择器 -->
             <el-select placeholder="请选择频道" v-model="searchForm.channel_id">
                 <!-- el-option是下拉的选项 label是显示值 value是绑定的值 -->
                 <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id">

                 </el-option>
             </el-select>
         </el-form-item>
         <el-form-item label="日期范围">
              <!-- 日期选择组件 要设置type属性为 daterange-->
              <el-date-picker type="daterange" v-model="searchForm.datePange">

              </el-date-picker>
         </el-form-item>
     </el-form>
     <!-- 文章的主体结构 flex布局-->
     <el-row class='total' type='flex' align="middle">
            <span>共找到1000条符合条件的内容</span>
     </el-row>
     <!-- 列表内容 -->
     <div class="article-item" v-for="item in 100" :key="item">
         <!-- 左侧内容 -->
         <div class="left">
             <img src="http://img3.imgtn.bdimg.com/it/u=1152899291,1406946364&fm=26&gp=0.jpg" alt="">
             <div class="info">
                 <span>111</span>
                 <el-tag class="tag">已发表</el-tag>
                 <span>222</span>
                 <span class="data">2020-02-18 10:12:19</span>
             </div>
         </div>
         <!-- 右侧内容 -->
         <div class="right">
             <span>
                 修改
                 <i  class="el-icon-edit"></i>
             </span>
             <span>
                 删除
                 <i class="el-icon-delete"></i>
             </span>
         </div>
     </div>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 定义一个表单数据对象
      searchForm: {
        // 文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除，不传为全部 / 先将 5 定义成 全部
        // 传值的是时候如果是5 就不传
        status: 5, // 默认是全部状态
        channel_id: null, // 表示没有任何的频
        datePange: []// 日期范围
      },
      channels: []// 专门来接收频道的数据
    }
  },
  methods: {
    //   获取频道
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        // 获取频道接口返回的数据
        this.channels = result.data.channels
      })
    }
  },
  created () {
    // 获取频道数据
    this.getChannels()
  }
}
</script>

<style lang="less" scoped>
 .articles {
      .total {
        height: 60px;
        border-bottom: 1px dashed #ccc;
      }
      // 对文章循环项进行样式的编写
       .article-item {
         display: flex;
         justify-content: space-between;
         padding: 20px  0;
         border-bottom: 1px solid #ccc;
       .left {
           display: flex;
           img {
             width:180px;
             height: 100px;
             border-radius: 4px;
               }
               .info {
             display: flex;
             flex-direction: column;
             height: 100px;
             justify-content: space-around;
             margin-left: 10px;
              .date {
               color: #999;
               font-size:12px;
             }
              .tag {
               width: 60px;
               text-align: center;
              }
          }
       }
       .right {
           span {
             font-size: 12px;
             margin-right: 8px;
             cursor: pointer;
             user-select: none;
           }
         }
    }
 }
</style>
