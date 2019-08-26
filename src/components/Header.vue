<template>
    <div style="display: flex;flex-direction: row;
   justify-content: flex-end; background-color: rgb(0, 110, 255); color: #fff; align-items: center">
        <nav>
            <router-link to="/">Home</router-link>
        </nav>
        <div style="display: flex;flex-direction: row;align-items: center; margin-right: 10px">
            <i class="large material-icons">person</i>
            <p> {{name}}</p>
        </div>

    </div>
</template>

<script>
    import api from '../router/axios/api'

    export default {
        name: "Header",
        data() {
            return {name: ''}
        },
        methods: {
            getCorrectName() {
                api.post('/auth/me').then((response) => {
                    this.name = response.data.user.name
                }).catch(() => {

                })
            },
        },
        created() {
            this.getCorrectName()
        },
        computed: {
            userName() {
                return this.getCorrectName()
            }
        }
    }
</script>

<style scoped>

</style>