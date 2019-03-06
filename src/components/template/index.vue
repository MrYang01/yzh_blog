<template>
    <div class="mt80">
        <transition name='animate-width'>
            <div class="progress-top bg-primary" :class='{"animate-width-enter":loading,"animate-width-over":loadingOver}'></div>
        </transition>
        <app-header></app-header>
        <router-view class="container"></router-view>
        <transition name='fade'>
            <div class="flex-box middle ajaxLoading fixed full" v-show='ajaxLoading.length' v-notouch>
            </div>
        </transition>
        <transition name='fade'>
            <div class="flex-box middle tipsCotent fixed full" v-show='tipsCotentShow' v-notouch>
                <div class="z-depth-1 pd15 tc bg-white radius10" style='max-width:80%;'>
                    <i class="f30">ˇωˇ</i><br />
                    <p class="f14 text-bold">{{tip.content}}</p>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import appHeader from './appHeader'
    export default {
        name: "index",
        data(){
            return {
                loading: false,
                loadingOver: false,
                ajaxLoading: [],
                tipsCotentShow: false,
                tip: {
                    content: '提交成功！'
                }
            }
        },
        created(){
            //template loading 处理
            this.$router.beforeEach((to, from, next) => {
                //添加loading
                this.loading = true;
                next();
            });
            this.$router.afterEach((to, from) => {
                setTimeout(() => {
                    this.loadingOver = true;
                    setTimeout(() => {
                        this.loading = false;
                        this.loadingOver = false;
                    }, 600)
                }, 100)
            });

        },
        components:{
            appHeader,
        }
    }
</script>

<style scoped>
    .ajaxLoading {
        position: fixed;
        left: 0;
        z-index: 99999;
        background-color: rgba(255, 255, 255, 0.1);
        top: 0;
        background: url('//misc.360buyimg.com/mtd/pc/index_2017/2.1.0/static/images/lazyload@2x.gif') no-repeat center;
        background-size: 70px auto;
    }

    .tipsCotent {
        position: fixed;
        left: 0;
        z-index: 99999;
        background-color: rgba(255, 255, 255, 0.5);
        top: 0;
    }
    .progress-top {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        width: 0%;
        opacity: .8; // background-color: #d22429;
        z-index: 999999;
    }

    .animate-width-enter {
        transition: width 0.3s, opacity 0.6s 0.2s;
        width: 20%;
    }

    .animate-width-over {
        transition: width 0.3s, opacity 0.6s 0.2s;
        width: 100%;
        opacity: 0;
    }
</style>
