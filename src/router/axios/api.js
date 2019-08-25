import axios from 'axios'
import BrowserStorage from '../../services/browser-storage'
import Router from '../../router'

let instance = axios.create({
    baseURL: 'http://localhost:8000/',
    responseType: 'json'
})

instance.interceptors.request.use((config) => {
    let authToken = BrowserStorage.get('access_token')
    if (typeof authToken !== 'undefined') {
        config.headers.authorization = `Bearer ${authToken}`
    }

    return config

}, (error) => {
    return Promise.reject(error)
})

instance.interceptors.response.use((response) => {
    if (typeof response.headers.authorization !== 'undefined') {
        BrowserStorage.set('access_token', response.headers.authorization)
    }

    return response

}, function (error) {
    if (error.response.status === 401) {
        Router.push({ name: 'Login' })
    }

    return Promise.reject(error.response)
})

export default instance
