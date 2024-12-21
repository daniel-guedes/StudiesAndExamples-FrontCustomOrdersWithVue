<template>
    <div id="main-banner">
        <h1>Escolha os itens do <br> seu pedido!</h1>
    </div>
</template>

<script>
    export default {
        name: "Banner"
    }
</script>

<style scoped>
    #main-banner {
        background-image: url('/public/img/banner.jpg');
        background-position: 0px -350px;
        background-repeat: no-repeat;
        background-size: cover;
        height: 700px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    #main-banner h1 {
        color: #f0f0f0;
        text-align: center;
        font-size: 60px;
        background-color: #8cb918;
        padding: 15px;
    }
</style>