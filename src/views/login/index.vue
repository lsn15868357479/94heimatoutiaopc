<template>
  <div class="login">
    <!-- 表单 -->
    <el-card class="login-card">
      <!-- 表单内容 -->
      <!-- 头部logo部分 -->
      <div class="title">
          <img src='../../assets/img/logo_index.png' alt="">
      </div>
      <!-- 表单 -->
      <el-form :model="loginFrom" :rules="rules" ref="ruleForm" style="margin-top:20px">
          <!-- 表单容器 表示要绑定的字段名 -->
          <el-form-item prop="phone">
              <!-- 表单域  v-model双向绑定-->
              <el-input v-model="loginFrom.phone" placeholder="请输入手机号"  clearable></el-input>
          </el-form-item>
          <!-- 验证码 -->
          <el-form-item prop='yzm'>
              <el-input v-model="loginFrom.yzm" style="width:60%" placeholder="请输入验证码" clearable></el-input>
             <!-- 放置一个按钮 -->
             <el-button style="float:right">发送验证码</el-button>
          </el-form-item>
          <el-form-item prop="checked">
              <!-- 是否同意 -->
              <el-checkbox v-model="loginFrom.checked">我阅读同意用户协议和隐私条款</el-checkbox>
          </el-form-item>
          <!-- 按钮 -->
          <el-form-item>
              <el-button style="width:100%" type="primary">登录</el-button>
          </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 登录表单的数据
      loginFrom: {
        phone: '', // 手机号
        yzm: '', // 验证码
        checked: false// 是否同意用户协议
      },
      // 定义一个表单验证规则
      rules: {
        // 手机号验证规则
        // required: true表示必字段必填
        phone: [{ required: true, message: '手机号码不能为空' }, {
          pattern: /^1[3-9]\d{9}$/,
          message: '你的手机号格式不正确'
        }],
        // 验证码验证规则
        yzm: [{ required: true, message: '验证码不能为空' }, {
          pattern: /^\d{6}$/,
          message: '验证码应该是6位数字'
        }],
        // 是否勾选规则
        checked: [{
          validator: function (rule, value, callback) {
          // rule是当前的校验规则
          // value是当前的要校验的字段的值
          // calllback是一个回调函数 不论成功或者失败都要执行
          // 成功执行callback 失败执行 callback(new Error('错误信息'))
          // 我们认为 如果 value 为true 就表示 校验成功 如果value 为false就表示校验失败
            // new Error(错误信息) 就是我们提示的错误信息
            value ? callback() : callback(new Error('请先勾选同意条款'))
          }
        }]
      }
    }
  }
}
</script>

<style lang='less' scoped>
// 加了scoped属性 就只会对当前组件的组件起作用
// 如果需要写less 需要在style标签 lang=‘less
.login {
  background-image: url('../../assets/img/58ddb5a7b14c9.jpg');
  height: 100vh; // 当前屏幕可是区域分成100份
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-card {
    width: 440px;
    height: 340px;
    .title{
        text-align: center;
        img{
            height: 40px;
        }
    }
  }
}
</style>
