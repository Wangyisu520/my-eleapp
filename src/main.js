import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

import {Indicator} from 'mint-ui';



Vue.config.productionTip = false
Vue.prototype.$axios = axios

Vue.use(MintUI)

axios.interceptors.request.use(
  config => {
    Indicator.open();
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    Indicator.close();
    return response;
  },
  error => {
    Indicator.close();
    return Promise.reject(error);
  }
);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')