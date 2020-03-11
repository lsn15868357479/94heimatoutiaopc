<template>
<!-- elementUI布局组件 el-row 和 el-col  -->
<el-row align="middle" type='flex' class='layout-header'>
<!-- 两列 -->
 <el-col class='left' :span="12">
    <!-- 图标 -->
      <!-- class为动态的图标了 -->
       <!-- :class="{ class名称: 布尔值,class名称: 布尔值  }" -->
     <i @click="collapse=!collapse" :class="{'el-icon-s-fold' : !collapse, 'el-icon-s-unfold' : collapse}"></i>
    <span> 江苏传智播客教育科技股份有限公司 </span>
</el-col>
<!-- 右侧列 -->
    <el-col class='right' :span="12">
        <!-- 再次放置一个row组件-->
        <el-row type='flex' justify="end" align="middle">
          <!-- <img src="../../assets/img/0e0a60f3ceb503c4d5d621ac029735ca.jpg" alt=""> -->
           <img :src="userInfo.photo" alt="">
           <!-- 下拉菜单 点击下拉菜单会触发 command事件-->
           <el-dropdown trigger='click' @command="clickMenu">
               <!-- 显示的内容 -->
               <!-- <span>大魔王</span> -->
                <span>{{ userInfo.name }}</span>
                <!-- 下拉内容需要做具名插槽dropdown  el-dropdown-menu是专门做下拉的组件 -->
                <el-dropdown-menu slot="dropdown" >
                   <!-- 下拉选项 el-dropdown-item 作为下拉选项组件 给每一个添加command属性-->
                    <el-dropdown-item command="info">个人信息</el-dropdown-item>
                    <el-dropdown-item command="git">git地址</el-dropdown-item>
                    <el-dropdown-item command="lgout">退出</el-dropdown-item>

                </el-dropdown-menu>
           </el-dropdown>
        </el-row>
    </el-col>
</el-row>
</template>

<script>
import eventBus from '@/utils/eventBus'
export default {
  data () {
    return {
      userInfo: {}, // 用户个人信息
      collapse: false// 开始不是折叠的
    }
  },
  // 监听data中数据变化
  watch: {
    collapse () {
    //  说明折叠状态变了
      eventBus.$emit('changeCollapse')// 触发一个改变折叠状态的事件
    }
  },
  methods: {
    clickMenu (command) {
      //   需要处理三种情况
      if (command === 'info') {
        // 点击了解个人信息
      } else if (command === 'git') {
        // 如果点击了git地址就跳转到github仓库
        window.location.href = 'https://github.com/lsn15868357479/94heimatoutiaopc'
      } else {
        // 退出系统 1、删除token 2、跳转登录页
        window.localStorage.removeItem('user-token') // 删除localStorage中的某个选项
        this.$router.push('./login')// 跳转回登录页 编程式导航
      }
    },
    getUserInfo () {
      // const token = localStorage.getItem('user-token')// 从缓存中取出 token
    // 获取用户的个人信息
      this.$axios({
      // url: '/user/profile', // 请求地址
      // headers: {
      //   Authorization: `Bearer ${token}`// 格式要求 Bearer +token
      // }// 请求头参数
        url: '/user/profile'// 请求地址
      }).then(result => {
      // 如果加载成功了 我们要将数据赋值给 userInfo
      // this.userInfo = result.data.data
        this.userInfo = result.data
      })
    }
  },
  created () {
    this.getUserInfo()// 张翠加载
    eventBus.$on('updateUser', () => {
      // 如果有人触发了updateUser事件 聚会进入到该函数
      // 从新获取信息
      this.getUserInfo()
    })
  }
}
</script>

<style lang='less' scoped>
.layout-header {
    height: 60px;
    .left {
        i{
            font-size: 20px;
        }
    }
    .right {
        img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-right: 4px;
        }
    }
}
</style>
