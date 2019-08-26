import store from '../store/store'
import api from '../router/axios/api'
import BrowserStorage from './browser-storage'
import {hasPermission} from "./permissions";

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
        return api.post('/auth/logout').then(() => {
            store.dispatch('currentUser/resetCurrentUser')
            BrowserStorage.remove('access_token')
        })
    },
    canAccess: function (permission = null) {
        return new Promise((resolve, reject) => {
            const listPermissions = store.state.currentUser.permissions

            this.isUserLogged = store.state.currentUser.checkIfUserAreLoggedIn

            const verifyPermission = () => {
                if (permission === null) {
                    return resolve()
                }
                if (permission) {
                    const mustValidate = hasPermission(permission) && this.isUserLogged
                    return mustValidate ? resolve() : reject()
                }
            }

            if (listPermissions.length) {
                verifyPermission()
            } else {
                api.post('/auth/me').then((response) => {
                    store.dispatch('currentUser/saveCurrentUser', response.data.user)
                        .then(() => {
                            verifyPermission()
                        })
                }).catch(() => {
                    store.dispatch('currentUser/resetCurrentUser')
                    BrowserStorage.remove('access_token')
                    reject()
                })
            }
        })
    }
}

export default authentication 
