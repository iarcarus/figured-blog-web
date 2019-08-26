<template>
    <div style="">
        <h2>{{post.tittle}}</h2>
        <div>
            <p style="color: darkgrey">{{post.created_at}}</p>
            <p style="color: darkgrey">{{post.author.name}}</p>
        </div>
        <p>{{post.text}}</p>
        <div>
            <button v-if="canDestroy" @click="deletePost(post._id)" class="btn-flat"><i class="material-icons">delete</i></button>
            <button v-if="canEdit" @click="edit(post._id)" class="btn-flat"><i class="material-icons">edit</i></button>
        </div>
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
            }
        }
    }
</script>

<style>

</style>