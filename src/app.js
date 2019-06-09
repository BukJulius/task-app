import '@src/styles/app.css'

import Vue from 'vue'
import Router from '@src/scripts/router'
import App from '@src/App.vue'
import UiElements from '@src/components/ui'

Vue.use(UiElements)

new Vue({
  el: '#app',
  components: { App },
  template: '<app/>',
  router: Router
})
