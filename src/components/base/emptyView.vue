<template>
    <div>
        <div style='height:300px;' >
            <!--class="flex-box middle"-->
            <div>
                <!--class="tc"-->
                <!--<img src="~static/img/anyi.svg" alt="" style='height:80px;'>-->
                <br/>
                <p >{{empty}}</p>
                <!--class="color-muted"-->
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        props: {
            empty: {
                type: String,
                default: '暂无数据'
            }
        },
        data() {
            return {}
        }
    }

</script>

<style scoped>


</style>
