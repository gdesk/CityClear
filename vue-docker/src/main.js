import Vue from 'vue'
import App from './App.vue'
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbvue/build/css/mdb.css';

import feather from 'vue-icon'
Vue.use(feather, 'v-icon')

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
