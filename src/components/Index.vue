<template>
  <div class="app">
    <h1>这是首页</h1>
    <about></about>
    <h6>测试测试</h6>
  </div>
</template>

<script>
import About from './About.vue'
console.log(1111111);
export default {
  components: {
    About
  }
}
</script>


<style lang="less">
    .app{
      h1{
        color:green;
      }
    }
</style>
