<template>
<!-- elementUI布局组件 el-row 和 el-col  -->
<el-row align="middle" type='flex' class='layout-header'>
<!-- 两列 -->
 <el-col class='left' :span="12">
    <!-- 图标 -->
     <i class='el-icon-s-fold'></i>
    <span> 江苏传智播客教育科技股份有限公司 </span>
</el-col>
<!-- 右侧列 -->
    <el-col class='right' :span="12">
        <!-- 再次放置一个row组件-->
        <el-row type='flex' justify="end" align="middle">
          <img src="../../assets/img/avatar.jpg" alt="">
           <!-- 下拉菜单 -->
           <el-dropdown trigger='click'>
               <!-- 显示的内容 -->
               <span>大魔王</span>
                <!-- 下拉内容需要做具名插槽dropdown  el-dropdown-menu是专门做下拉的组件 -->
                <el-dropdown-menu slot="dropdown" >
                   <!-- 下拉选项 el-dropdown-item 作为下拉选项组件-->
                    <el-dropdown-item>个人信息</el-dropdown-item>
                    <el-dropdown-item>git地址</el-dropdown-item>
                    <el-dropdown-item>退出</el-dropdown-item>

                </el-dropdown-menu>
           </el-dropdown>
        </el-row>
    </el-col>
</el-row>
</template>

<script>
export default {

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
