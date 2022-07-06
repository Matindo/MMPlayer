<template>
  <div id="app">
    <navbar></navbar>
    <router-view/>
  </div>
</template>
<script>
import Navbar from '@/components/Navbar.vue'
export default {
  components: { Navbar }
}
</script>

<style lang="scss">
@import '../src/assets/styles/custom.scss';
body {
  background: $body-bg center center fixed;
  color: $body-color;
}
</style>
