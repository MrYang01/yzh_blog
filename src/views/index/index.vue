<template>
    <div style=" margin-top: 90px; height: 2000px;">
        {{msg}}
    </div>
</template>

<script>
    export default {
        name: "index",
        data(){
            return {
                msg: "",
            }
        },
        created(){
            this.msg = this.$.getTime(new Date().getTime());
        },
        methods:{

        },
    }
</script>

<style scoped>

</style>
