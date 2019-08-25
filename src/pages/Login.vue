<template>
    <div>
        <label>Login</label>
        <input v-model="credentials.email" type="text"/>

        <label>Password</label>
        <input v-model="credentials.password" type="password"/>

        <button @click="login">Login</button>
    </div>
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
                        this.$router.push('/')
                    })
                    .catch(reason => {
                    })
            }
        }
    }
</script>

<style scoped>

</style>