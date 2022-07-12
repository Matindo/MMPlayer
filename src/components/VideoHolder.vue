<template>
 <div class="video-holder">
  <b-card :title="video.title" :img-src="video.thumbnail" :img-alt="video.title" overlay text-variant="white" :sub-title="video.dateCreated" sub-title-text-variant="light">
  </b-card>
 </div>
</template>

<script>
export default {
  name: 'VideoHolder',
  props: {
    video: Object
  }
}
</script>

<style lang="scss" scoped>
.video-holder {
  float: none;
  border-radius: 5%;
  margin: 0 1.2rem;
  display: inline-block;
  background: rgb(7, 7, 7);
}

.video-holder :hover {
  box-shadow: 0px 0px 15px 1px rgba(0, 255, 234, 0.448);
}
</style>
