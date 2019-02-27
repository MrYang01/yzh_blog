<template>
    <div>
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
