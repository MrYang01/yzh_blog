import Vue from 'vue'
import Router from 'vue-router'
import empty from '@c/base/emptyView'
import indexRoute from './index/index'
import aboutRoute from './about/index'
import articleRoute from './article/index'
import articleEditRoute from './article/edit_article'

Vue.use(Router);

let routes = [{
    path: "",
    name: "home",
    redirect:{
        name: "index"
    },
    component: () => import("@c/base/emptyView")
}];

routes.push(indexRoute);
routes.push(aboutRoute);
routes.push(articleRoute);
routes.push(articleEditRoute);

routes.push({
    path: "*",
    name: "404",
    component: () => import("@c/base/error")
});

export default new Router({
    mode: 'history',
    routes,
})
