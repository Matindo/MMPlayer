<template>
  <b-container fluid>
    <b-row class="main-details w-100 mb-3">
      <b-col cols="7">
        <b-embed type="iframe" aspect="16by9" :src="link" allowfullscreen>
        </b-embed>
      </b-col>
      <b-col cols="auto" class="text-details">
        <span class="title">{{video.title}}</span><br />
        <span class="channel-title">{{video.channelTitle}}</span><br />
        <span class="description">{{video.description}}</span>
      </b-col>
    </b-row>
    <b-row class="w-100 related">
      <b-row class="search-title m-2">
        <h3>Similar Videos: </h3>
      </b-row>
      <b-col v-for="result in videos" :key="result.id.videoId">
        <video-holder :video="result"></video-holder>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex'
import VideoHolder from '@/components/VideoHolder.vue'

export default {
  components: { VideoHolder },
  name: 'VideoView',
  computed: {
    link: function () {
      return 'https://www.youtube.com/embed/' + this.video.id.videoId + '?rel=0'
    },
    ...mapGetters({
      video: 'CURRENT_VIDEO',
      videos: 'VIDEOS'
    })
  }
}
</script>

<style lang="scss" scoped>
.main-details {
  flex-direction: row;
  display: inline-flex;
}
.text-details {
  color: whitesmoke
}
.related {
  overflow-x: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: nowrap;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

</style>
