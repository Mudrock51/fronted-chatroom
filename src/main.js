import Vue from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import store from "@/store.js";
import './socket.js';

// 通过 axios 使用后台 RestfulAPI 接口
axios.defaults.baseURL = 'http://localhost:8088/api';

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
