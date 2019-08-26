<template>
    <div id="app" class="container">
        <Header/>
        <router-view/>
    </div>
</template>

<script>
    import Header from "./components/Header";
    import Aside from "./components/Aside";

    export default {
        name: 'app',
        components: {
            Aside,
            Header
        }
    }
</script>

<style>
    #app {}
</style>
