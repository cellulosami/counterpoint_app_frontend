import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Vex from "vexflow";

axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.baseURL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://why-cant-i-firmus-backend-8f870cb50d42.herokuapp.com";

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
