<template>
    <div >
        <div class="article">
            后台接口调用：<a href="http://localhost:3000/users/getUserInfo?id=1">getUserInfo</a>
            <div class="title pd-l25 pd-r25">
                <p class="color-title f24">{{article.title}}</p>
                <div class="color-sub mt15 mb15" :gutter="20">
                    <span class="inline-block mr20">{{$.getTime(article.time)}}</span>
                    <span class="inline-block mr15">标签：{{label}}</span>
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
        name: "article",
        data(){
            return {
                config:{
                    subfield: false,
                    preview: "preview",
                    toolBarBtn: false,
                    boxShadow: false,
                },
                article: this.$.getData("article")[0],
            }
        },
        methods:{
            getLabel(){
                this.$.label.forEach(item => {
                    if(item.id === this.article.label){
                        this.label = item.label;
                    }
                })
            }
        },
        created(){
            this.getLabel();
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
