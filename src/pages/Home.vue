<template>
    <div class="home">
        <router-link v-if="canCreate" to="/post/create"><i class="material-icons">add</i>
        </router-link>
        <div v-if="posts.length">

            <Post
                    v-for="(post, index) in posts"
                    v-on:reloadPosts="loadPosts"
                    v-bind:key="index"
                    v-bind:post="post"
            />
        </div>
        <div v-else>
            <p>Nao existem posts</p>
        </div>
    </div>

</template>

<script>
    import api from '../router/axios/api';
    import Post from "../components/_post/Post";
    import {BLOG_CREATE} from "../collections/permissions.collection"

    export default {
        name: 'Home',
        components: {Post},
        props: {},
        data() {
            return {
                posts: []
            }
        },
        created() {
            this.loadPosts()
        },
        methods: {
            loadPosts() {
                api.get('post/')
                    .then(response => {
                        this.posts = response.data.data
                    })
            }
        }, computed:{
            canCreate(){
                return this.$hasPermission(BLOG_CREATE)
            }
        }
    }


</script>