<template>
 <div class="video-holder">
  <b-card :title="videoData.title" :img-src="videoData.thumbnail" :img-alt="videoData.title" img-top>
   <b-card-text>
     {{ videoData.description }}
   </b-card-text>
   <template #footer>
    <small class="text-muted"> {{ videoData.dateCreated }} </small>
   </template>
  </b-card>
 </div>
</template>

<script>
export default {
  name: 'VideoHolder',
  props: {
    video: {
      typeof: Object,
      required: true
    }
  }/*,
  data: function () {
    return {
      videoData: {
        title: 'Test Video',
        dateCreated: '22-06-2022',
        description: 'This is a test video description to use in outr video holder container model',
        thumbnail: 'https://picsum.photos/300/300/?image=41'
      }
    }
  } */
}
</script>

<style lang="scss" scoped>
.video-holder {
 width: 300px;
 height: 300px;
 background: seashell;
}
</style>
