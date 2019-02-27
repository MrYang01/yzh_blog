import index from '@c/template/index'

let router = {
    path: "/about",
    name: "about",
    meta: {
        show: true,
        title: "关于",
    },
    redirect: {
        name: "about.index"
    },
    component: index,
    children: [{
        path: "",
        name: "about.index",
        component: () => import("@c/base/error")
    }, {
        path: "home",
        name: "about.home",
        meta: {
            type:2
        },
        component: () => import("@c/base/error")
    },]
};

export default router
