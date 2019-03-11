<template>
    <div >
        <div class="article">
            <div class="title pd-l25 pd-r25">
                <p class="color-title f24">{{article.title}}</p>
                <div class="color-sub mt15 mb15 pr" :gutter="20">
                    <span class="inline-block mr20">{{$.getTime(article.time)}}</span>
                    <span class="inline-block mr15">标签：{{label}}</span>
                    <span class="pa color-primary pointer" style="right: 0;" @click="edit">编辑</span>
                </div>
                <div class="b-b"></div>
            </div>
            <mavon-editor id="shower" v-model="article.content" class="mt10 flex1"
                          :subfield="config.subfield"
                          :defaultOpen="config.preview"
                          :toolbarsFlag="config.toolBarBtn"
                          :boxShadow="config.boxShadow"
            />
        </div>
    </div>
</template>

<script>
    import { mavonEditor } from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css'
    export default {
        name: "articleDetail",
        data(){
            return {
                config:{
                    subfield: false,
                    preview: "preview",
                    toolBarBtn: false,
                    boxShadow: false,
                },
                article: {
                    title: '',
                    label: "",
                    time: '',
                    content: '',
                },
                label: '',
            }
        },
        methods:{
            edit(){
                let _this = this;
                this.$router.push({
                    name: "article.edit",
                    query: {articleId: _this.article.articleId}
                })
            },
            getLabel(){
                this.$.label.forEach(item => {
                    if(item.id === this.article.label){
                        this.label = item.label;
                    }
                })
            },
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
        },
        created(){
            this.getLabel();
            this.getArticle();
        },
        components:{
            mavonEditor,
        }
    }
</script>

<style scoped>
.title{
    text-align: left;
}
</style>
