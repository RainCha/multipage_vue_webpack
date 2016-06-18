import Vue from 'vue'
// require a *.vue component
import Index from '../../components/Index.vue'


// mount a root Vue instance
new Vue({
  el: '#app',
  components: {
    app: Index
  }
});
