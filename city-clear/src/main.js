import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import feather from 'vue-icon'
import 'leaflet/dist/leaflet.css'; 
Vue.use(feather, 'v-icon')
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
