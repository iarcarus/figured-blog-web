<template>
    <div class="blog-post">
        <h2 class="blog-post-title">{{post.tittle}}</h2>
        <div>
            <p class="blog-post-meta">{{post.created_at}} by {{post.author.name}}</p>
        </div>

        <p v-if="single">{{post.text}}</p>
        <div v-else>
            <p>{{resume}}</p>
            <a href="Post.vue">Saiba mais</a>
        </div>

        <div>
            <button v-if="canDestroy" @click="deletePost(post._id)" class="btn-flat"><i
                    class="material-icons">delete</i></button>
            <button v-if="canEdit" @click="edit(post._id)" class="btn-flat"><i class="material-icons">edit</i></button>
        </div>
        <hr v-if="!single"/>
    </div>
</template>

<script>
    import api from '../../router/axios/api'
    import {BLOG_EDIT, BLOG_DESTROY} from '../../collections/permissions.collection'

    export default {
        name: "Post",
        props: {
            post: {
                type: Object,
                required: true
            },
            single: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            edit(id) {
                this.$router.push({name: 'EditPost', params: {id: id}})
            },
            deletePost(id) {
                api.delete(`post/${id}`).then(() => {
                    this.$toast.open('deleted')
                    this.$emit('reloadPosts')
                }).catch()
            }
        }, computed: {
            canEdit() {
                return this.$hasPermission(BLOG_EDIT)
            },
            canDestroy() {
                return this.$hasPermission(BLOG_DESTROY)
            },
            resume() {
                return this.post.text.substring(0, 30)
            }
        }
    }
</script>

<style>
.blog-post{
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