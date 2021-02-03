import Vue from 'vue'
import App from './App.vue'
import router from './router'//5、在main.js中引用本路由

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
