<template>
    <div style="display: flex; ">
        <i class="large material-icons">person</i>
        <p> {{getCorrectName()}}</p>
    </div>
</template>

<script>
    export default {
        name: "Header",
        methods: {
            getCorrectName () {
                console.log(this.$store.state.currentUser.user)
                return this.$store.state.currentUser.user.name
            },
        }
    }
</script>

<style scoped>

</style>