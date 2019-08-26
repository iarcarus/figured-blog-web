<template>

    <form @submit="signup">
        <div class="form-group">
            <label for="userName">Name</label>
            <input v-model="user.name" type="text" class="form-control" id="userName"
                   aria-describedby="name" placeholder="Enter name">
        </div>
        <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input v-model="user.email" type="email" class="form-control" id="exampleInputEmail1"
                   aria-describedby="emailHelp" placeholder="Enter email">
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input v-model="user.password" type="password" class="form-control" id="exampleInputPassword1"
                   placeholder="Password">
        </div>
        <button class="btn btn-primary">Submit</button>
    </form>


</template>

<script>
    import api from './../router/axios/api'

    export default {
        name: "Signup",
        data() {
            return {
                user: {
                    email: '',
                    password: '',
                    role_id: 2
                }
            }
        },
        methods: {
            signup(e) {
                e.preventDefault()
                api.post('user', {user_form: this.user}).then(() => {
                    this.$router.push({name: 'Login'})
                    this.$toast.open('Created')
                }).catch(e => {
                    this.$toast.open({
                        message: e.data.error.message,
                        type: 'error'
                    })
                })
            }
        }
    }
</script>

<style scoped>

</style>
