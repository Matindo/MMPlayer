<template>
 <b-container class="table p-3 m-2">
  <b-row class="text-heavy" cols="12" align-h="between" align-v="center">
   <b-col>Song Name: </b-col>
   <b-col>Artist:</b-col>
  </b-row>
  <b-row class="w-100" align-v="stretch" align-h="center">
   <b-col cols="12" class="table-data">
    <b-row class="track" v-for="track in tracks" :key="track.url">
    <b-col cols="12" sm="6" md="7" lg="8" @click="songClicked(track)">{{ track.name }}</b-col>
     <b-col cols=" 12" sm="6" md="5" lg="4">{{track.artist}}</b-col>
    </b-row>
   </b-col>
  </b-row>
 </b-container>
</template>

<script>
import axios from 'axios'
import LastFM from '@/api/lastfm/services'
import YouTube from '@/api/youtubeAPIconfig'

export default {
  name: 'SongTable',
  props: {
    borderlessOption: {
      type: Boolean,
      default: true
    },
    smallOption: {
      type: Boolean,
      default: true
    },
    stripedOption: {
      type: Boolean,
      default: true
    },
    tracks: {
      required: true
    }
  },
  data: function () {
    return {
      api: {
        key: YouTube.API_KEY,
        nextPageToken: '',
        q: '',
        maxResults: 10,
        type: 'video',
        baseUrl: 'https://www.googleapis.com/youtube/v3/search?',
        order: 'viewCount'
      }
    }
  },
  methods: {
    songClicked: async function (song) {
      await LastFM.getArtistInfo(song.artist).then(artist => {
        this.$store.dispatch('SET_CURRENT_ARTIST', artist)
      })
      await LastFM.getTrackInfo(song.artist, song.name).then(track => {
        this.$store.dispatch('SET_CURRENT_TRACK', track)
      })
      await LastFM.getArtistTopAlbums(song.artist).then(albums => {
        this.$store.dispatch('SET_ALBUMS', albums)
      })
      await LastFM.getArtistTopTracks(song.artist).then(topTracks => {
        this.$store.dispatch('SET_ARTIST_POPULAR_SONGS', topTracks)
      })
      await this.searchYoutube(song)
      if (('album' in this.$store.getters.CURRENT_SONG) && ('title' in this.$store.getters.CURRENT_SONG.album)) {
        await LastFM.getAlbumInfo(song.artist, this.$store.getters.CURRENT_SONG.album.title).then(album => {
          this.$store.dispatch('SET_CURRENT_ALBUM', album)
        })
      }
      this.$router.push('/song')
    },
    searchYoutube: async function (song) {
      const query = song.artist + ' ' + song.name
      this.api.q = query.trim().split(' ').join('+')
      console.log('this.api.q=', this.api.q)
      const { baseUrl, type, order, maxResults, q, key } = this.api
      const apiUrl = `${baseUrl}part=snippet&type=${type}&order=${order}&maxResults=${maxResults}&key=${key}&q=${q}`
      console.log('apiUrl:', apiUrl)
      await axios
        .get(apiUrl)
        .then(res => {
          console.log('getdata-res=', res)
          this.$store.dispatch('SET_CURRENT_VIDEO', res.data.items[0])
        }).catch(error => console.error(error))
    }
  }
}
</script>

<style lang="scss" scoped>
* {
 color: whitesmoke;
}
.table {
  width: 100%;
}
.text-heavy {
  font-weight: bolder;
  color: goldenrod;
  margin-bottom: 7px;
  border-bottom: 2px groove;
}
.table-data {
 height: 350px;
 overflow-y: auto;
 white-space: nowrap;
}
.track {
 border-bottom: 1px ridge brown;
 margin: .8rem;
 padding: 2px;
}
.track :hover {
 font-size: 1.1rem;
 background: rgba(255, 255, 255, 0.858);
 color: rgb(19, 7, 39);
 cursor: hand;
 transition-duration: .5s;
}
</style>
