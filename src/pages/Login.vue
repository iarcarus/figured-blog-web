<template>

    <form>
        <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input  v-model="credentials.email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input v-model="credentials.password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
        </div>
        <button @click="login" class="btn btn-primary">Submit</button>
    </form>

</template>

<script>
    import authentication from '../services/authentication';

    export default {
        name: "Login",
        data() {
            return {
                credentials: {
                    email: null,
                    password: null
                }
            }
        },
        methods: {
            login() {
                authentication.login(this.credentials)
                    .then(() => {
                        this.$router.push({name: 'Home'})
                    })
                    .catch(reason => {
                    })
            }
        }
    }
</script>

<style scoped>

</style>