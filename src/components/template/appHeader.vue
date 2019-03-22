<template>
    <div class="header mb20" :class="{'is-top': scrollBtn, 'header-hide': headerHideBtn}">
        <div class="container flex-box tran flex-between v-middle f16 full-h color-content">
            <div class="flex-box v-middle full-h">
                <div class="logo full-h">
                    <img src="@/assets/logo.png" class="full-h">
                </div>
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
            <div class="flex-box v-middle">
                <div class="pr a-hover-primary">
                    <input type="text" class="search-btn f13">
                    <span class="iconfont icon-search pa inline-block pointer" style="left: -20px; top: 7px"></span>
                </div>
                <div class="pr a-hover-primary ml30 pointer">
                    <span class="iconfont iconxiepinglun"><span class="ml5">写文章</span></span>
                </div>
                <!--<el-input></el-input>-->
            </div>
        </div>
        <el-button circle class="pf pd10 top-btn" @click="smoothscroll"><i class="iconfont iconjiasu"></i></el-button>
    </div>
</template>

<script>
    export default {
        name: "appHeader",
        data(){
            return {
                selectIndex: "",
                routes: [],
                name:"yzh",
                scrollBtn: true,
                headerHideBtn: false,
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
            window.addEventListener('scroll', this.$.debounce(this.scrollFn, 300));
            window.addEventListener('scroll', this.headerHideFn);
        },
        methods:{
            goRoute(item){
                this.$router.push({
                    name: item.name
                });
                this.selectIndex = item.path;
            },
            scrollFn(){
                if (window.scrollY > 300) {
                    this.scrollBtn = false;
                } else {
                    this.scrollBtn = true;
                }
            },
            scrollTop(){
                var top = document.body.scrollTop || document.documentElement.scrollTop;
                if(top < 600) return;
                clearInterval(scrollToptimer);
                let scrollToptimer = setInterval(() => {
                    console.log("定时循环回到顶部")
                    var speed = top / 4;
                    if (document.body.scrollTop >= 2) {
                        document.body.scrollTop -= speed;
                    }else {
                        document.documentElement.scrollTop -= speed;
                    }
                    if (top <= 2) {
                        clearInterval(scrollToptimer);
                    }
                }, 25);
            },
            smoothscroll(){
                var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
                if (currentScroll > 1) {
                    window.requestAnimationFrame(this.smoothscroll);
                    window.scrollTo (0,currentScroll - (currentScroll/5));
                }
            },
            headerHideFn(){
                let topStart = document.body.scrollTop || document.documentElement.scrollTop;
                if(topStart < 600) return;
                clearTimeout(headerHideTimer);
                let headerHideTimer = setTimeout(() => {
                    let topEnd = document.body.scrollTop || document.documentElement.scrollTop;
                    console.log(topEnd, topStart);
                    if(topEnd - topStart > 0){
                        console.log("向下滚动");
                        this.headerHideBtn = true;
                    }else if(topEnd - topStart < 0){
                        console.log("向上滚动");
                        this.headerHideBtn = false;
                    }
                    clearTimeout(headerHideTimer);
                }, 30);
            },
        }
    }
</script>

<style scoped lang="scss">

</style>
