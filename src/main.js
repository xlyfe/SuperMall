import Vue from 'vue'
import App from './App.vue'
import router from './router'//5、在main.js中引用本路由
import VueBus from "vue-bus";//引用中央事件总线$bus

Vue.config.productionTip = false

Vue.use(VueBus);

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
