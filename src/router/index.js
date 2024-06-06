import Vue from 'vue';
import Router from 'vue-router';
import AuthView from '@/views/AuthView.vue';
import ChatView from '@/views/ChatView.vue';
import Admin from "@/views/Admin.vue";


Vue.use(Router);

const routes = [
    { path: '/', redirect: '/user' },
    { path: '/user', component: AuthView },
    { path: '/chat', component: ChatView },
    { path: '/admin',component: Admin},
];

const router = new Router({
    mode: 'history',
    routes
});

export default router;
