<template>
  <b-container fluid>
    <b-row class="w-100 song-details">
      <h3 class="text-light">Song: </h3>
      <b-row class="w-100 mb-2 p-3" align-h="between" align-v="stretch">
        <b-col cols="12" md="6" class="justify center">
          <b-row class="song-info m-2 mr-auto" align-h="around">
            <span class="title">{{track.name}}</span><br />
            <span class="text-secondary">{{track.artist.name}}</span><br />
            <span class="description">{{track.wiki.published}}</span>
          </b-row>
          <b-row class="album-info w-100 bg-grey">
            <h4 class="text-light">Songs in the album:</h4><br />
            <song-table :borderlessOption="true" :smallOption="true" :strippedOption="true" :tracks="album"
              v-if="album.length > 0">
            </song-table>
            <p v-else style="padding-left: 1em;">There are no songs in this album. It might be a single.</p>
          </b-row>
        </b-col>
        <b-col cols="12" md="6">
          <b-row class="song-video w-100">
            <b-embed type="iframe" aspect="4by3" allowfullscreen="false"
              :src="`https://www.youtube.com/embed/${video.id.videoId}?rel=0`">
            </b-embed>
          </b-row>
          <b-row class="video-details w-100 m-2">
            <span class="title">{{video.snippet.title}}</span><br />
            <span class="channel-title text-secondary">{{video.snippet.channelTitle}}</span><br />
          </b-row>
        </b-col>
      </b-row>
      <hr />
      <h3 class="text-light">Artist Details: </h3>
      <b-row class="w-100 mb-2" align-h="around" align-v="start">
        <b-col class="artist" cols="12" md="6">
          <b-row class="artist-data w-100">
            <b-media>
              <template #aside>
                <b-img :src="artist.image[1]['#text']" blank-color="#ccc" width="64" alt="placeholder"></b-img>
              </template>
              <h5 class="mt-0">{{artist.name}}</h5>
            </b-media>
            <div class="scrollable-div">
              <p>{{artist.bio.content}}</p>
            </div>
          </b-row>
          <b-row class="top-songs w-100">
            <h4 class="text-light">Popular songs:</h4>
            <song-table :borderlessOption="true" :smallOption="true" :strippedOption="false"
              :tracks="popularArtistSongs" />
          </b-row>
        </b-col>
        <b-col cols="12" md="6">
          <h4 class="text-light">Other albums by this artist:</h4>
          <ul role="list">
            <li v-for="album in albums" :key="album.mbid">
              <a @click="searchAlbum(album)">{{album.name}} - {{album.year}}</a>
            </li>
          </ul>
        </b-col>
      </b-row>
    </b-row>
  </b-container>
</template>

<script>
import SongTable from '@/components/SongTable.vue'
import { mapGetters } from 'vuex'
export default {
  components: { SongTable },
  name: 'SongView',
  computed: {
    ...mapGetters({
      popularArtistSongs: 'POPULAR_ARTIST_SONGS',
      currentAlbum: 'CURRENT_ALBUM',
      albums: 'ALBUMS',
      video: 'CURRENT_VIDEO',
      artist: 'CURRENT_ARTIST',
      track: 'CURRENT_SONG'
    }),
    album: function () {
      const albumTracks = []
      if (this.albumFull) {
        for (let i = 0; i < this.currentAlbum.tracks.length; i++) {
          albumTracks.push(this.currentAlbum.tracks[i])
        }
      }
      return albumTracks
    },
    albumFull: function () {
      if (this.currentAlbum && 'tracks' in this.currentAlbum) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
* {
  color: whitesmoke
}
.track {
 position: relative;
 display: flex;
 align-items: center;
 margin: 5px 75px;
 text-align: left;
 cursor: pointer;
 border-radius: 4px;
 background-color: transparent;
 transition: all 0.3s ease-in-out;

 .track-image {
  display: inline-block;
  border-radius: 4px;
  width: 56px;
  height: 56px;
  background-color: #ccc;
  object-fit: cover;
 }
li {
  list-style: none;
  color:#ccc;
}
 .track-play {
  position: absolute;
  font-size: 28px;
  opacity: 0;
  color: #fff;
  top: 14px;
  left: 16px;
  z-index: 3;
  pointer-events: none;
  transition: opacity 0.3s ease-in-out;

  &.bm-icon-plus-solid {
   font-size: 36px;
   top: 11px;
   left: 11px;
  }
 }

 &:hover {
  background-color: rgba(0, 0, 0, 0.557);

  .track-play {
   opacity: 0.9;
  }
 }

 &.track-in-playlist {
  background-color: rgba(0, 0, 0, 0.557);

  .track-title {
   font-weight: 600;
   color: whitesmoke;
  }

  .track-image {
   transform: none;
  }

  .track-play {
   opacity: 1;
  }
 }
}
.song-info, .video-details {
  display: inline-flexbox;
  flex-direction: column;
}
.scrollable-div {
  overflow-y: scroll;
  white-space: nowrap;
}
</style>
