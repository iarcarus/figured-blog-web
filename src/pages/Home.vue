<template>
    <div class="row">
        <div class="row col-md-8 blog-main" style="margin-top: 50px">
            <div v-if="posts.length" class="col s7">

                <Post
                        v-for="(post, index) in posts"
                        v-bind:key="index"
                        v-bind:post="post"
                />
            </div>
            <div v-else>
                <p>There are no posts</p>
            </div>
        </div>
            <Aside/>
    </div>

</template>

<script>
    import api from '../router/axios/api';
    import Post from "../components/_post/Post";
    import {BLOG_CREATE} from "../collections/permissions.collection"
    import Aside from "../components/Aside";

    export default {
        name: 'Home',
        components: {Aside, Post},
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