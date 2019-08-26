import BrowserStorage from '../../services/browser-storage'

const state = {
    checkIfUserAreLoggedIn: typeof BrowserStorage.get('access_token') !== 'undefined',
    user: {
        name: '',
        role: {
            permissions: {}
        }
    },
    permissions: []
}

const getters = {
    userName: ({user}) => user.name,
    role: ({user}) => user.role || [],
}

const mutations = {
    authenticated: state => state.checkIfUserAreLoggedIn = true,
    unauthenticated: state => state.checkIfUserAreLoggedIn = false,
    setUser: (state, user) => {
        state.user.name = user.name || {}
        state.user.role = user.role || {}
        state.permissions = user.role.permissions || []
    }
}

const actions = {
    saveCurrentUser({commit, getters}, user) {
        commit('authenticated')
        commit('setUser', user)
    },
    resetCurrentUser: ({commit}) => {
        commit('unauthenticated')
        commit('setUser', {})
    }
}

export default {
    namespaced: true,
    actions,
    mutations,
    getters,
    state
}
