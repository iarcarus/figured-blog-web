<template>
    <div class="blog-post">
        <h2 class="blog-post-title">{{post.tittle}}</h2>
        <div>
            <p class="blog-post-meta">{{post.created_at}} by {{post.author.name}}</p>
        </div>

        <p>{{resume}}...</p>
        <router-link :to="{ name: 'ShowPost', params: { id: post._id }}">Read more...</router-link>
        <hr/>
    </div>
</template>

<script>
    export default {
        name: "Post",
        props: {
            post: {
                type: Object,
                required: true
            },
        },
        methods: {}, computed: {
            resume() {
                return this.post.text.substring(0, 100)
            }
        }
    }
</script>

<style>
    .blog-post {
        margin-bottom: 4rem;
    }

    .blog-post-title {
        margin-bottom: .25rem;
        font-size: 2.5rem;
    }

    .blog-post-meta {
        margin-bottom: 1.25rem;
        color: #999;
    }
</style>