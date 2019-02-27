<template>
    <div class="header mb20">
        <div class="container flex-box tran flex-between v-middle f16 full-h color-content">
            <div class="flex-box v-middle full-h">
                <div class="ml30 a-hover-primary full-h flex-box middle pr"
                     :class="{selected: item.path === selectIndex}"
                     v-for="(item, index) in routes"
                     v-if="item.meta"
                     @click="goRoute(item)"
                >
                    <span>{{item.meta.title}}</span>
                    <span class="border pa bg-primary tran"></span>
                </div>
            </div>
            <div class="flex-box v-middle a-hover-primary">
                <div class="pr">
                    <input type="text" class="search-btn f13">
                    <span class="iconfont iconsearch pa inline-block" style="left: -20px; top: 5px"></span>
                </div>

                <!--<el-input></el-input>-->
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "appHeader",
        data(){
            return {
                selectIndex: "",
                routes: [],
                name:"yzh"
            }
        },
        created(){
            this.routes = this.$router.options.routes.filter((item) => {
                return item.meta && item.meta.show
            });
            let str = window.location.pathname.split("/")[1];
            this.routes.forEach((item, index) => {
                if(item.path.indexOf(str) > -1)
                    this.selectIndex = item.path;
            })
        },
        methods:{
            goRoute(item){
                this.$router.push({
                    name: item.name
                });
                this.selectIndex = item.path;
            }
        }
    }
</script>

<style scoped lang="scss">

</style>
