<template>
    <div class="contain-body flex-box flex-column edit middle">
        <el-row class="" :gutter="20">
            <el-col :span="2">
                <el-button>回到首页</el-button>
            </el-col>
            <el-col :span="16">
                <el-input placeholder="请输入文章标题" v-model="article.title"></el-input>
            </el-col>
            <el-col :span="2">
                <el-select v-model="article.label" placeholder="请选择">
                    <el-option v-for="item in $.label"
                               :key="item.id"
                               :label="item.label"
                               :value="item.id"
                    ></el-option>
                </el-select>
            </el-col>
            <el-col :span="2">
                <el-button @click="save(2)">发布文章</el-button>
            </el-col>
            <el-col :span="1" >
                <el-dropdown>
                    <el-button  type="text" class="el-dropdown-link">
                        <i class="iconfont icon-personal1"></i><i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>黄金糕</el-dropdown-item>
                        <el-dropdown-item>狮子头</el-dropdown-item>
                        <el-dropdown-item>螺蛳粉</el-dropdown-item>
                        <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                        <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </el-row>
        <mavon-editor id="editor" v-model="article.content" class="mt10 flex1"
                      @save="save(1)"
                      :subfield="config.subfield"
                      :toolbarsFlag="config.toolBarBtn"
                      :boxShadow="config.boxShadow"
        />
    </div>
</template>

<script>
    import { mavonEditor } from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css'
    export default {
        name: "edit",
        data(){
            return {
                value: '',
                article:{
                    articleId: 0,
                    label: '',
                    time: '',
                    status: 1,
                    title: '',
                    content: '',
                },
                config:{
                    subfield: true,
                    preview: "edit",
                    toolBarBtn: true,
                    boxShadow: false,
                },
            }
        },
        created(){
            if(this.$route.query.articleId){
                this.getArticle()
            }
        },
        methods:{
            getArticle(){
                this.$axios({
                    url: 'article/getArticle',
                    type: 'get',
                    data: {
                        articleId: this.$route.query.articleId
                    },
                    elseData: {
                        formData: true
                    }
                }).then((res) => {
                    console.log(res);
                    this.article = res.d;
                })
            },
            save(status){
                // status 1: 草稿  2: 发布
                this.article.status = status;
                this.$axios({
                    type: "post",
                    data: this.article,
                    url: "article/editArticle"
                }).then( (res) => {
                    console.log(res.d);
                    if(res.d.articleId){
                        this.article.articleId = res.d.articleId;
                    }
                })
            },
            // 绑定@imgAdd event
            $imgAdd(pos, $file){
                // 第一步.将图片上传到服务器.
                var formdata = new FormData();
                formdata.append('image', $file);
                this.$axios({
                    url: 'server url',
                    type: 'post',
                    data: formdata,
                    headers: { 'Content-Type': 'multipart/form-data' },
                }).then((url) => {
                    // 第二步.将返回的url替换到文本原位置![...](./0) -> ![...](url)
                    /**
                     * $vm 指为mavonEditor实例，可以通过如下两种方式获取
                     * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
                     * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
                     */
                    $vm.$img2Url(pos, url);
                })
            }
        },
        components: {
            mavonEditor,
        }
    }
</script>

<style scoped lang="scss">
    /*@import url('@/assets/module/color.scss');*/
    .edit {
        padding-top: 20px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        height: 100vh;
    }
</style>
