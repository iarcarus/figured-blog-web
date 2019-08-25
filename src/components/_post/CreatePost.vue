<template>
    <div style="margin-top: 50px">
        <form>
            <label>titulo</label>
            <input v-model="newPost.tittle" type="text" placeholder="My new post"/>
            <label>Texto</label>
            <input v-model="newPost.text" placeholder="My new post" type="text"/>
        </form>
        <div style="color: darkgrey">
            <label>Autor</label>
            <p v-if="newPost.author">
                {{newPost.author.name}}
            </p>
            <label>Id</label>
            <p v-if="newPost._id">
                {{newPost._id}}
            </p>
            <label>Created</label>
            <p v-if="newPost.created_at">
                {{newPost.created_at}}
            </p>
            <label>Last update</label>
            <p v-if="newPost.updated_at">
                {{newPost.updated_at}}
            </p>
        </div>

        <div>
            <button @click="back">Cancel</button>
            <button @click="save">Save</button>
        </div>

    </div>
</template>

<script>
    import api from '../../router/axios/api'

    export default {
        name: "CreatePost",
        props: {},
        data() {
            return {
                newPost: {
                    tittle: '',
                    text: ''
                },
                mode: 'new'
            }
        },
        created() {
            const id = this.$route.params.id

            if (id) {
                api.get(`post/${id}`)
                    .then(({data}) => {
                        this.newPost = data.data
                    }).catch(e => {
                    if (e.status == 422) {
                        e.data.errors.forEach(error => (this.$toast.open({message: error.message, type: 'error'})
                        ))
                    }
                }).finally(() => {
                    this.mode = 'edit'
                })
            }
        },
        methods: {
            save() {
                switch (this.mode) {
                    case 'new':
                        api.post('post', {post_form: this.newPost})
                            .then(response => {
                                this.$router.push('/about')
                                this.$toast.open({
                                    message: 'Created',
                                })
                            }).catch(e => {
                            if (e.status == 422) {
                                e.data.errors.forEach(error => (this.$toast.open({
                                        message: error.message,
                                        type: 'error'
                                    })
                                ))
                            }
                        })
                        break
                    case 'edit':
                        api.put(`post/${this.newPost._id}`, {post_form: this.newPost})
                            .then(response => {
                                this.$router.push('/about')
                                this.$toast.open({
                                    message: 'Saved',
                                })
                            }).catch(e => {
                            if (e.status == 422) {
                                e.data.errors.forEach(error => (this.$toast.open({
                                        message: error.message,
                                        type: 'error'
                                    })
                                ))
                            }
                        })
                        break
                }
            },
            back() {
                this.$router.push('/about')
            }
        }
    }
</script>
