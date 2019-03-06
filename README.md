# yzh_blog

> 杨泽红个人博客

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

### 文章数据类型
```json5
{
    articleid: '',
    label: '',
    title: '',
    status: 1,      // 1草稿 || 2发布,
    content: '',
    time: '',
    commands:[
        {
            userId: '',
            userPicUrl: '',
            time: '',
            content: '',
        }
    ],
}

```
