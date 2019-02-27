import Vue from 'vue'
import Router from 'vue-router'
import empty from '@c/base/emptyView'
import indexRoute from './index/index'
import aboutRoute from './about/index'
import articleRoute from './article/articlle'

Vue.use(Router);

let routes = [];

routes.push(indexRoute);
routes.push(aboutRoute);
routes.push(articleRoute);

routes.push({
    path: "*",
    name: "404",
    component: () => import("@c/base/error")
});

export default new Router({
    mode: 'history',
    routes,
})
