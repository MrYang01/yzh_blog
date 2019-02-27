import index from '@c/template/index'

let router = {
    path: "/index",
    name: "index",
    meta: {
        show: true,
        title: "首页",
    },
    redirect: {
        name: "index.index"
    },
    component: index,
    children: [{
        path: "",
        name: "index.index",
        meta: {
            title: ""
        },
        component: () => import("@v/index/index")
    },]
};

export default router
