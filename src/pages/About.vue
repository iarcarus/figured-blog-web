<template>
  <div class="about">

    <div>

      <Post
              v-for="(post, index) in posts"
              v-bind:key="index"
             v-bind:post="post"
      />
    </div>
  </div>

</template>

<script>
    import api from '../router/axios/api';
    import Post from "../components/_post/Post";

    export default {
        name: 'About',
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
                    }).catch(e => {
                    console.log(e)
                })
            }
        }
    }


</script>