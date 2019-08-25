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
    },
    canAccess: function(module = null, permission = null) {
    return new Promise((resolve, reject) => {
        // let listPermissions = store.state.currentUser.user.role.permissions['WEB']
        //
        // this.isUserLogged = store.state.currentUser.checkIfUserAreLoggedIn
        //
        // const verifyPermission = () => {
        //     if (permission == null) {
        //         return hasPermission(module) && this.isUserLogged ? resolve() : reject()
        //     }
        //     return hasAction(module, permission) && this.isUserLogged ? resolve() : reject()
        // }
        //
        // if (listPermissions) {
        //     verifyPermission()
        // } else {
            api.post('/auth/me').then((response) => {
                store.dispatch('currentUser/saveCurrentUser', response.data.user)
            }).catch(() => {
                store.dispatch('currentUser/resetCurrentUser')
                BrowserStorage.remove('access_token')
                reject()
            })
        // }
    })
}
}

export default authentication 
