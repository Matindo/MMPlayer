<template>
  <b-container fluid>
    <b-row class="main-details mb-3" align-h="between" align-v="stretch">
      <b-col cols="12" md="7" class="video-frame">
        <b-embed type="iframe" aspect="16by9" :src="link" allowfullscreen>
        </b-embed>
      </b-col>
      <b-col cols="12" md="5" class="text-details">
        <span class="title">{{video.snippet.title}}</span><br />
        <span class="channel-title text-secondary">{{video.snippet.channelTitle}}</span><br />
        <span class="description">{{video.snippet.description}}</span>
      </b-col>
    </b-row>
    <b-row class="w-100">
      <h3 class="text-light">Similar Videos: </h3>
      <b-row class="m-2 related">
        <b-col v-for="result in videos" :key="result.id.videoId">
          <video-holder :video="result"></video-holder>
        </b-col>
      </b-row>
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
  },
  created: function () {
    console.log(this.video)
  }
}
</script>

<style lang="scss" scoped>
.main-details {
  margin: 2rem;
  width: 95%;
  align-self: center;
}
.video-frame {
  height: 70%;
}
.text-details {
  color: whitesmoke
}
.related {
  overflow-x: auto;
  justify-content: space-around;
  flex-wrap: nowrap;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.title {
  font-weight: bolder;
}
</style>
