<template>
  <div class="scrollable_div">
    <b-row class="w-100 scroll-pane">
      <b-col v-for="video in videos" :key="video.id">
        <video-holder :video="video"/>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import VideoHolder from '@/components/VideoHolder.vue'

export default {
  name: 'ScrollableDiv',
  components: {
    VideoHolder
  },
  data: function () {
    return {
      videos: []
    }
  },
  methods: {
    loadVideos: () => {
      this.videos = [
        {
          videoID: '1',
          title: 'Test Video',
          dateCreated: '22-06-2022',
          description: 'This is a test video description to use in outr video holder container model',
          thumbnail: 'https://picsum.photos/300/300/?image=41'
        }
      ]
    }
  },
  created: () => {
    this.loadVideos()
  }
}
</script>

<style lang="scss" scoped>
.scrollable_div{
  width: 100%;
  height: 400px;
  padding: 0 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  border: solid rgba(255, 0, 183, 0.16);
  border-top: 0;
  border-left: none;
  box-shadow: 3px 4px 5px 5px rgba(129, 2, 93, 0.4);
  position: relative;
  background: rgba(0, 0, 0, 0.1);
}

.scroll-pane {
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
