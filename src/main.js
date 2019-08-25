import Vue from 'vue'
import App from './App.vue'
import store from './store/store'
import VueToast from 'vue-toast-notification'
import 'vue-toast-notification/dist/index.css'
import { ValidationProvider, extend } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'
import {hasPermission} from "./services/permissions";
import router from './router'

extend('required', {
  ...required,
  message: 'The {field} is required'
});
Vue.config.productionTip = false
Vue.prototype.$hasPermission = module => hasPermission(module)
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

Vue.use(VueToast)
