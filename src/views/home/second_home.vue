<template>
<!-- 二级路由的默认组件 -->
<div class="second_home">
     <!-- 幻灯片 -->
    <el-carousel :interval="4000" type="card" height="300px">
      <el-carousel-item v-for="item in list" :key="item">
         <img :src="item" alt="">
      </el-carousel-item>
    </el-carousel>
</div>
</template>

<script>
export default {
  data () {
    return {
      list: [
        'http://b-ssl.duitang.com/uploads/item/201806/24/20180624232250_gjuvt.jpg',
        'http://img3.duitang.com/uploads/item/201603/24/20160324201331_QYXvh.thumb.700_0.jpeg',
        'http://img0.imgtn.bdimg.com/it/u=1749161875,3768963471&fm=26&gp=0.jpg',
        'http://img1.imgtn.bdimg.com/it/u=1449297510,166126525&fm=26&gp=0.jpg'
      ]
    }
  }
}
</script>

<style lang='less'>
.second_home{
     /* calc 计算的意思 在css中计算数值 用法  calc ( 四则运算  ) 变量之间 和运算符之间一定要有空格 */
  height: calc(100vh - 60px);
  background-size: cover;
  background-image: url("http://00.minipic.eastday.com/20170407/20170407003732_b667d194a4d001919e38b014cbe5ffb3_1.jpeg");
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
