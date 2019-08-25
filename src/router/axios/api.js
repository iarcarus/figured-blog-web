import axios from 'axios'
import BrowserStorage from '../../services/browser-storage'
import Router from '../../router'

let instance = axios.create({
    baseURL: 'http://localhost:8000',
    responseType: 'json'
})

instance.interceptors.request.use((config) => {
    let authToken = BrowserStorage.get('access_token')

    if (typeof authToken !== 'undefined') {
        config.headers.authorization = authToken
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
    const responseStatus = error && error.response && error.response.status

    if (expectedErrorResponses.includes(responseStatus)) {
        Router.push({ name: 'Login' })
    }

    return Promise.reject(error.response)
})

export default instance
