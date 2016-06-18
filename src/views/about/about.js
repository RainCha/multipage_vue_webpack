import Vue from 'vue'
// require a *.vue component
import App from  '../../components/About.vue'

// mount a root Vue instance
new Vue({
  el: '#app',
  components: {
    // include the required component
    // in the options
    app: App
  }
})
