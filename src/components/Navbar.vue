<template>
    <div id="nav">
        <router-link to="/" id="logo-url">
            <img :src="logo" :alt="alt" id="logo">
        </router-link>
        <router-link to="/">Home</router-link>
        <router-link to="/orders">Pedidos</router-link>
    </div>
</template>

<script>
    export default {
        name:"Navbar",
        props: ["logo","alt"]

    }
</script>

<style scoped>
    #nav {
        background-color: #3d043b;
        border-bottom: 4px solid #111;
        padding: 15px 50px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    #nav #logo-url {
        margin: auto;
        margin-left: 0;
    }

    #logo {
        width: 50px;
        height: 50px;
    }

    #nav a {
        color: #A2D128;
        text-decoration: none;
        margin: 12px;
        transition: .5s;
    }

    #nav a:hover {
        color: #FFF;
        text-decoration: none;
        margin: 12px;
        transition: .5s;
    }

</style>