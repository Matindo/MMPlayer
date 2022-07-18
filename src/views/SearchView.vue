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
              <b-button variant="danger" @click="db='YT'; parseSearchString();">Search Youtube</b-button>
            </b-input-group-append>
            <b-input-group-append>
              <b-button variant="warning" @click="searchLastFM">Search LastFM</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form>
      </b-col>
    </b-row>
    <b-row class="results">
      <b-col cols="12" style="padding: 1em;">
        <b-row class="search-title">
          <b-col cols="auto" cols-md="6" class="mr-auto">
            <h3>Results: </h3>
          </b-col>
          <b-col cols="auto">
            <span variant="secondary" class="ml-auto">Showing 25 results</span>
          </b-col>
        </b-row>
        <b-row v-if="results.length < 1">
          <b-col offset=".5">No results to show</b-col>
        </b-row>
        <b-row v-else class="search-videos">
          <b-col v-for="result in results" :key="result.videoId">
            <video-holder :video="result"></video-holder>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import VideoHolder from '@/components/VideoHolder.vue'
// import InfiniteLoading from 'vue-infinite-loading'
import YouTube from '@/api/youtubeAPIconfig'
import LastFM from '@/api/lastfm/services'
import axios from 'axios'

export default {
  name: 'SearchView',
  components: { VideoHolder },
  data: function () {
    return {
      results: [],
      query: '',
      db: '',
      vcounts: [],
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
      this.api.q = this.query.join('+')
      console.log('about-mounted-this.api.q=', this.api.q)
      const { baseUrl, type, order, maxResults, q, key } = this.api
      const apiUrl = `${baseUrl}part=snippet&type=${type}&order=${order}&maxResults=${maxResults}&key=${key}&q=${q}`
      console.log('abtpage-mountedapiUrl', apiUrl)
      this.getData(apiUrl)
    },
    searchLastFM: function () {
      LastFM.searchTrack(this.query).then((results) => {
        this.results = results
        // this.type = type;
        // this.hasSearch = true;
        // this.loading = false;
        console.log(this.results)
      })
    },
    getData: function (apiUrl) {
      axios
        .get(apiUrl)
        .then(res => {
          console.log('getdata-res=', res)
          this.results.push(...res.data.items)
          this.api.nextPageToken = res.data.nextPageToken
          // collect view count for each video
          let aa = ''
          this.results.forEach(function (x) {
            const z = x.contentDetails.videoId
            aa = `${z},${aa}`
          })
          console.log('aa1=', aa)
          const { key } = this.api
          const apiUrl1 = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${aa}&key=${key}`
          console.log('homepage-apiUrl1', apiUrl1)
          axios
            .get(apiUrl1)
            .then(res => {
              this.vcounts.push(...res.data.items)
              console.log('res', res)
            })
        }).catch(error => console.error(error))
    },
    parseSearchString: function () {
      // Trim search String
      const trimmedSearchString = this.query.trim()
      console.log('searchform.vue-string=', trimmedSearchString)
      if (trimmedSearchString !== '') {
        // Split search string
        const searchParams = trimmedSearchString.split(/\s+/)
        // Emit event
        this.query = searchParams
        if (this.db === 'YT') {
          this.searchYoutube()
          console.log('YT called')
        } else {
          this.searchLastFM()
          console.log('LastFM called')
        }
        // Reset input
        this.query = ''
      } else {
        this.$router.push({ path: '/' })
      }
    }
  },
  mounted: function () {
    const { key } = this.api
    const apiUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails%2Cstatus&maxResults=20&playlistId=UU29ju8bIPH5as8OGnQzwJyA&key=${key}`
    console.log('homepage-mountedapiUrl', apiUrl)
    this.getData(apiUrl)
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
}
</style>
