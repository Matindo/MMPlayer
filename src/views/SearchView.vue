<template>
  <b-container fluid>
    <b-row class="search-pane w-100" align-h="around" align-v="center">
      <b-col cols="7">
        <b-form>
          <label class="sr-only" for="search-input">Search</label>
          <b-input-group prepend="Search:" class="mb-2 mr-sm-2 mb-sm-0">
            <b-form-input id="search-input" placeholder="Enter album, song or artist to search" v-model="query">
            </b-form-input>
            <b-input-group-append>
              <b-button variant="danger" @click="searchLastFM(); searchYoutube()">Search</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form>
      </b-col>
    </b-row>
    <b-row class="results">
      <b-col cols="12" style="padding: 1em;">
        <b-row v-if="videos.length === 0 && tracks.length === 0">
          <b-col offset=".5">No results to show</b-col>
        </b-row>
        <b-row v-if="tracks.length > 0">
          <b-row class="search-title w-100">
            <b-col cols="auto" cols-md="6" class="mr-auto">
              <h3>Songs: </h3>
            </b-col>
            <b-col cols="auto">
              <span variant="secondary" class="ml-auto">Showing {{tracks.length}} results</span>
            </b-col>
          </b-row>
          <song-table :tracks="tracks" />
        </b-row>
        <b-row v-if="videos.length > 0" class="search-videos">
          <b-row class="search-title w-100">
            <b-col cols="auto" cols-md="6" class="mr-auto">
              <h3>Videos: </h3>
            </b-col>
            <b-col cols="auto">
              <span variant="secondary" class="ml-auto">Showing {{videos.length}} results</span>
            </b-col>
          </b-row>
          <b-col v-for="result in videos" :key="result.id.videoId">
            <video-holder :video="result"></video-holder>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import VideoHolder from '@/components/VideoHolder.vue'
import YouTube from '@/api/youtubeAPIconfig'
import LastFM from '@/api/lastfm/services'
import axios from 'axios'
import { mapGetters } from 'vuex'
import SongTable from '@/components/SongTable.vue'

export default {
  name: 'SearchView',
  components: { VideoHolder, SongTable },
  computed: {
    ...mapGetters({
      videos: 'VIDEOS',
      tracks: 'TRACKS'
    })
  },
  data: function () {
    return {
      query: '',
      db: '',
      reformatedSearchString: '',
      api: {
        key: YouTube.API_KEY,
        nextPageToken: '',
        q: '',
        maxResults: 25,
        type: 'video',
        baseUrl: 'https://www.googleapis.com/youtube/v3/search?',
        order: 'viewCount'
      }
    }
  },
  methods: {
    searchYoutube: function () {
      this.api.q = this.query.trim().split(' ').join('+')
      console.log('about-mounted-this.api.q=', this.api.q)
      const { baseUrl, type, order, maxResults, q, key } = this.api
      const apiUrl = `${baseUrl}part=snippet&type=${type}&order=${order}&maxResults=${maxResults}&key=${key}&q=${q}`
      console.log('abtpage-mountedapiUrl', apiUrl)
      this.getData(apiUrl)
    },
    searchLastFM: function () {
      LastFM.searchTrack(this.query).then((results) => {
        this.$store.dispatch('SET_TRACKS', results).then(() => {
          console.log('tracks', this.tracks)
        })
      })
    },
    getData: function (apiUrl) {
      this.videos.splice(0, this.videos.length)
      axios
        .get(apiUrl)
        .then(res => {
          console.log('getdata-res=', res)
          this.$store.dispatch('SET_VIDEOS', res.data.items)
          this.api.nextPageToken = res.data.nextPageToken
        }).catch(error => console.error(error))
      this.query = ''
    }
  }
}
</script>

<style lang="scss" scoped>

.results {
  padding: 1em;
  margin: 2em;
  min-height: 70vh;
  margin-bottom: 3em;
  border-radius: 10px;
  box-shadow: 8px 6px 22px 5px rgba(255, 255, 255, 0.264);
  background: rgba(0, 0, 0, 0.1);
  color: aliceblue;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap
}

.row-title {
  width: 100%;
  margin-right: auto;
}

.track-wrapper {
  display: block;
  margin: 0;
  padding: 0 10px;
  width: 100%;
  box-sizing: border-box;
}
</style>
