import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.baseURL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "/";

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
