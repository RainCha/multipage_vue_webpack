import Vue from 'vue'
// require a *.vue component
import Index from '../../components/Index.vue'


console.log(Vue,22222222222222)
// mount a root Vue instance
new Vue({
  el: '#app',
  components: {
    app: Index
  }
});
