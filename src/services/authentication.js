import store from '../store/store'
import api from '../router/axios/api'
import BrowserStorage from './browser-storage'

const authentication = {
    isUserLogged: store.state.currentUser.checkIfUserAreLoggedIn,
    login: ({email, password}) => {
        return api
            .post('/auth/login', {email, password})
            .then((response) => {
                const user = response.data.user
                BrowserStorage.set('access_token', response.data.access_token)
                store.dispatch('currentUser/saveCurrentUser', user)
                return user
            })
    },
    logout: () => {
        return api.get('/signout').then(() => {
            store.dispatch('currentUser/resetCurrentUser')
            BrowserStorage.remove('access_token')
        })
    }
}

export default authentication 
