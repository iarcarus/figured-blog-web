<template>
    <div style="">
        <h2>{{post.tittle}}</h2>
       <div>
           <p style="color: darkgrey">{{post.created_at}}</p>
           <p style="color: darkgrey">{{post.author.name}}</p>
       </div>
        <p>{{post.text}}</p>
        <div>
            <i class="material-icons">delete</i>
            <button @click="edit(post._id)" class="btn-flat"><i class="material-icons">edit</i></button>
        </div>
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
            single: {
                type: Boolean,
                default : false
            }
        },
        methods: {
            edit(id){
                this.$router.push({name: 'EditPost', params: {id: id}})
            }
        }
    }
</script>

<style>

</style>