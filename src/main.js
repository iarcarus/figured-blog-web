import Vue from 'vue'
import App from './App.vue'
import store from './store/store'
import { ValidationProvider, extend } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'
import router from './router'

extend('required', {
  ...required,
  message: 'The {field} is required'
});
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
