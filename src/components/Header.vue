<template>
    <div>
        <header class="blog-header py-3">
            <div class="row flex-nowrap justify-content-between align-items-center">
                <div class="col-4 pt-1">
                    <a class="text-muted" href="#">Subscribe</a>
                </div>
                <div class="col-4 text-center">
                    <router-link class="blog-header-logo text-dark" to="/">Home</router-link>
                </div>
                <div class="col-4 d-flex justify-content-end align-items-center">
                    <a class="text-muted" href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor"
                             stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="mx-3" role="img"
                             viewBox="0 0 24 24" focusable="false"><title>Search</title>
                            <circle cx="10.5" cy="10.5" r="7.5"></circle>
                            <path d="M21 21l-5.2-5.2"></path>
                        </svg>
                    </a>
                    <div class="row" v-if="userName">
                        <p class="" v-if="userName"> {{userName}}</p>
                        <a v-if="userName" class="btn btn-sm btn-outline-secondary" @click="logout">Logout</a>
                    </div>
                    <a v-else class="btn btn-sm btn-outline-secondary" >Sign up</a>
                    <a v-if="!userName" class="btn btn-sm btn-outline-secondary"><router-link to="/login">Sign in</router-link></a>
                </div>
            </div>
        </header>

        <nav>

        </nav>

    </div>
</template>

<script>
    import authentication from './../services/authentication'
    export default {
        name: "Header",
        data() {
            return {name: ''}
        },
        methods:{
          logout(){
              authentication.logout().then(()=>{

              })
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