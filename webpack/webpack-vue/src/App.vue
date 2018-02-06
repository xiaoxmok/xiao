<template>
    <div id="text">{{text}}</div>
</template>

<script>
export default {
    name: "App",
    data(){
        return {
            text:'Hello'
        }
    }
}
</script>

<style scoped>
    .text{
        color:#ffe87c;
    }
</style>