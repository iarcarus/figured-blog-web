<template>
    <div>
        <form>
            <div class="form-group">
                <label>Title</label>
                <input v-model="newPost.tittle" type="text" placeholder="My new post" class="form-control"/>
            </div>
            <div class="form-group">
                <label for="postText">Text</label>
                <textarea v-model="newPost.text" class="form-control" id="postText"
                          rows="3"></textarea>
            </div>
            <div class="form-group">
                <button type="button" @click="back" class="btn btn-outline-secondary">Cancel</button>
                <button type="button" @click="save" class="btn btn-outline-primary">Save</button>
            </div>
        </form>
        <form v-if="newPost._id">
            <div class="form-group">
                <label>Author</label>
                <input v-model="newPost.author.name" class="form-control" type="text" readonly>
            </div>
            <div class="form-group">
                <label>Id</label>
                <input v-model="newPost._id" type="text" class="form-control" readonly/>
            </div>
            <div class="form-group">
                <label>Created</label>
                <input v-model="newPost.created_at" type="text" class="form-control" readonly/>
            </div>
            <div class="form-group">
                <label>Last updated</label>
                <input v-model="newPost.updated_at" type="text" class="form-control" readonly/>
            </div>
        </form>

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
                                this.$router.push({name: 'Home'})
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
                                this.$router.push({name: 'Home'})
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
                this.$router.push({name: 'Home'})
            }
        }
    }
</script>
