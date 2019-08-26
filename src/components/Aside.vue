<template>
    <aside class="col-md-4 blog-sidebar">
        <div class="p-4 mb-3 bg-light rounded">
            <h4 class="font-italic">About</h4>
            <p class="mb-0">Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras mattis consectetur purus sit
                amet fermentum. Aenean lacinia bibendum nulla sed consectetur.</p>
        </div>
        <div class="p-4" v-if="canCreate">
            <h4 class="font-italic">Actions</h4>

            <button type="button" v-if="canCreate" @click="createPost()" class="btn btn-outline-primary">
                New Post
            </button>
        </div>
    </aside>
</template>

<script>
    import {BLOG_CREATE} from "../collections/permissions.collection"

    export default {
        name: "Aside",
        computed: {
            canCreate() {
                return this.$hasPermission(BLOG_CREATE)
            }
        },
        methods: {
            createPost() {
                this.$router.push({name: 'CreatePost'})
            }
        }
    }
</script>