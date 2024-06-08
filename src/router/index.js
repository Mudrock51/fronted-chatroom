import Vue from 'vue';
import Router from 'vue-router';
import AuthView from '@/views/AuthView.vue';
import ChatView from '@/views/ChatView.vue';
import Admin from "@/views/Admin.vue";


Vue.use(Router);

export default new Router({
    mode: 'history',

    // 在下面添加路由
    routes: [
        {
            path: '/',
            redirect: '/user'
        },
        {
            path: '/user',
            name: 'Login',
            component: AuthView
        },
        {
            path: '/chat/:userId?',
            name: 'ChatPreview',
            component: ChatView
        },
        {
            path: '/chat/:userId/:groupId?',
            name: 'Chat',
            component: ChatView,
            props: true
        },
        {
            path: '/admin',
            name: 'Admin',
            component: Admin
        }
    ]
});
