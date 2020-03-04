<template>
<!-- 使用elementUI的 面包屑  -->
<el-breadcrumb separator=">">
    <!-- el-breadcrumb-item 相当于 router-link标签 -->
    <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
    <!-- 第二是动态的选项 -->
    <el-breadcrumb-item>
        <!-- 内容是动态的 -->
        <!-- 定义一个具名插槽 -->
        <slot name="title"></slot>
    </el-breadcrumb-item>
</el-breadcrumb>
</template>

<script>
export default {

}
</script>

<style>

</style>
