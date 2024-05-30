import Vue from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'

axios.defaults.baseURL = 'http://192.168.31.30:8080/api';

new Vue({
    router,
    render: h => h(App),
}).$mount('#app');
