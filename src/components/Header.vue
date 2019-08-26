<template>
    <div class="container">
        <header class="blog-header py-3">
            <div class="row flex-nowrap justify-content-between align-items-center">
                <div class="col-8 text-center">
                    <router-link class="blog-header-logo text-dark" to="/">Home</router-link>
                </div>
                <div class="col-4 d-flex justify-content-end align-items-center">
                    <div class="row" v-if="userName">
                        <p class="" v-if="userName"> {{userName}}</p>
                        <a v-if="userName" class="btn btn-sm btn-outline-secondary" @click="logout">Logout</a>
                    </div>
                    <a v-else class="btn btn-sm btn-outline-secondary" @click="signup">Sign up</a>
                    <a v-if="!userName" class="btn btn-sm btn-outline-secondary">
                        <router-link to="/login">Sign in</router-link>
                    </a>
                </div>
            </div>
        </header>
    </div>
</template>

<script>
    import authentication from './../services/authentication'

    export default {
        name: "Header",
        data() {
            return {name: ''}
        },
        methods: {
            logout() {
                authentication.logout().then(() => {

                })
            },
            signup() {
                this.$router.push({name: 'Signup'})
            }
        },
        computed: {
            userName() {
                return this.$store.state.currentUser.user.name.length ? this.$store.state.currentUser.user.name : ''
            }
        }
    }
</script>

<style scoped>

</style>