import index from '@c/template/index'

export default {
    path: "/article",
    name: "article",
    meta: {
        show: false,
        title: "文章",
    },
    redirect: {
        name: "article.index"
    },
    component: index,
    children:[{
        path: '',
        name: 'article.index',
        component: () => import("@v/article/articleDetail")
    }]

}
