<template>
  <b-row class="scrollable_div" align-v="stretch" align-h="around">
    <b-col cols="12" fluid>
      <b-row class="div-header">
        <h3>{{title}}</h3>
      </b-row>
      <div class="w-100 scroll-pane">
        <video-holder v-for="video in videos" :key="video.id" :video="video"/>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import VideoHolder from '@/components/VideoHolder.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'ScrollableDiv',
  props: ['title'],
  components: {
    VideoHolder
  },
  computed: {
    ...mapGetters({
      videos: 'VIDEOS'
    })
  }
}
</script>

<style lang="scss" scoped>
.scrollable_div{
  height: 60vh;
  padding: 1em;
  margin: 2em;
  margin-bottom: 3em;
  border-radius: 10px;
  box-shadow: 8px 6px 22px 5px rgba(255, 255, 255, 0.264);
  background: rgba(0, 0, 0, 0.1);
}

.div-header {
  margin-bottom: 5px;
  color: aliceblue;
}

.scroll-pane {
  padding: 1em;
  margin-bottom: 0;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scroll-pane::-webkit-scrollbar {
  display: none;
}
</style>
