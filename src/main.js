import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'// 引入ui
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import '@/styles/index.less'// 引入样式
Vue.config.productionTip = false
Vue.use(ElementUI)// 全局注册element-UI框计 一旦全局注册 所有的位置都可以使用组件
// Vue.use实际上会调用ElementUI对象里的一个方法 intall方法，并且传入当前vue对象
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
