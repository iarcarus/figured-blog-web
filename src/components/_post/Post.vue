<template>
    <h2>{{post.title}}</h2>

    <p>{{post.text}}</p>
</template>

<script>
    export default {
        name: "Post",
        props: {
            post: {
                type: Object,
                required: true
            }
        }
    }
</script>

<style scoped>

</style>