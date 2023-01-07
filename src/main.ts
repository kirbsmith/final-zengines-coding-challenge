import { createApp } from "vue";
import { Router, createRouter, createWebHistory } from 'vue-router'
import "./style.css";
import App from "./App.vue";
import Articles from './views/Articles.vue'
import ArticleDetails from './views/ArticleDetails.vue'
import AuthorDetailsVue from "./views/AuthorDetails.vue"


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path:'/', name: 'Articles', component: Articles},
        {path:'/article/:id?', name: 'ArticleDetails', component: ArticleDetails, props: true},
        {path:'/author/:id?', name: 'AuthorDetails', component: AuthorDetailsVue, props: true}
    ]
})

createApp(App).use(router).mount("#app");
