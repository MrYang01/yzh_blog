import base from '@c/HelloWorld'
import empty from '@c/base/emptyView'

let arr = [];

let router = {
    name: "index",
    path: "index",
    component: empty,
    children: arr
}
export default router
