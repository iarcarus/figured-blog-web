<template>
    <div class="blog-post">
        <h2 class="blog-post-title">{{postAttributes.tittle}}</h2>
        <div>
            <p class="blog-post-meta">{{postAttributes.created_at}} by {{postAttributes.author.name}}</p>
        </div>

        <p>{{postAttributes.text}}</p>

        <div>
            <button type="button" v-if="canDestroy" @click="deletePost(postAttributes._id)" class="btn btn-outline-danger mr-4">
                Delete
            </button>
            <button type="button" v-if="canEdit" @click="edit(postAttributes._id)" class="btn btn-outline-primary">Edit</button>
        </div>
    </div>
</template>

<script>
    import api from '../../router/axios/api'
    import {BLOG_EDIT, BLOG_DESTROY} from '../../collections/permissions.collection'

    export default {
        name: "SinglePost",
        props: {
            post: {
                type: Object,
                required: true
            }
        },
        methods: {
            edit(id) {
                this.$router.push({name: 'EditPost', params: {id: id}})
            },
            deletePost(id) {
                api.delete(`post/${id}`).then(() => {
                    this.$toast.open('deleted')
                    this.$router.push({name: 'Home'})
                }).catch()
            }
        },
        data() {
            return {
                aPost: this.post,
                singleMode: this.single
            }
        },
        created() {
            const id = this.$route.params.id

            api.get(`post/${id}`)
                .then(({data}) => {
                    this.aPost = data.data
                }).catch(e => {
                if (e.status == 422) {
                    e.data.errors.forEach(error => (this.$toast.open({message: error.message, type: 'error'})
                    ))
                }
            })
        }, computed: {
            canEdit() {
                return this.$hasPermission(BLOG_EDIT)
            },
            canDestroy() {
                return this.$hasPermission(BLOG_DESTROY)
            },
            resume() {
                return this.post.text.substring(0, 100)
            },
            postAttributes() {
                return this.aPost
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
