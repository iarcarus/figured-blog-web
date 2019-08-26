<template>
    <div style="display: flex;flex-direction: row;
   justify-content: flex-end; background-color: rgb(0, 110, 255); color: #fff; align-items: center">
        <nav>
            <router-link to="/">Home</router-link>
        </nav>
        <div style="display: flex;flex-direction: row;align-items: center; margin-right: 10px">
            <i class="large material-icons">person</i>
            <p> {{userName}}</p>
        </div>

    </div>
</template>

<script>
    export default {
        name: "Header",
        data() {
            return {name: ''}
        },
        computed: {
            userName() {
                return this.$store.state.currentUser.user.name
            }
        }
    }
</script>

<style scoped>

</style>