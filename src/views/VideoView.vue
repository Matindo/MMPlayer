<template>
  <b-container fluid>
    <b-row></b-row>
  </b-container>
</template>

<script>
export default {
  name: 'VideoView',
  data: function () {
    return {
      video: this.$route.params.video
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
