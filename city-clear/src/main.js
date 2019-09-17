import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js'
import './registerServiceWorker'
import feather from 'vue-icon'
import 'leaflet/dist/leaflet.css'; 
Vue.use(feather, 'v-icon')
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)


export const EventBus = new Vue();

Vue.config.productionTip = false

new Vue({
  router,
  created(){
    window.sessionStorage.urlHost = "http://" + window.location.hostname + ":5051" //"https://asw-19-city-clear.herokuapp.com"
  },
  render: h => h(App)
}).$mount('#app')
