import Vue from 'vue'
// require a *.vue component
import Concat from '../../components/Concat.vue'

// mount a root Vue instance
new Vue({
  el: '#app',
  components: {
    app: Concat
  }
});
