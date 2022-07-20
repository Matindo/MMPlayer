import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  supportCircular: true,
  storage: window.localStorage
})
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    current_video: {},
    current_song: {},
    current_artist: {},
    current_album: {},
    videos: [],
    tracks: [],
    albums: [],
    popularArtist: [],
    popularCountry: []
  },
  getters: {
    CURRENT_VIDEO: function (state) {
      return state.current_video
    },
    CURRENT_ALBUM: function (state) {
      return state.current_album
    },
    CURRENT_ARTIST: function (state) {
      return state.current_artist
    },
    CURRENT_SONG: function (state) {
      return state.current_song
    },
    VIDEOS: function (state) {
      return state.videos
    },
    TRACKS: function (state) {
      return state.tracks
    },
    ALBUMS: function (state) {
      return state.albums
    },
    POPULAR_ARTIST_SONGS: function (state) {
      return state.popularArtist
    },
    POPULAR_COUNTRY_SONGS: function (state) {
      return state.popularCountry
    }
  },
  mutations: {
    SET_CURRENT_VIDEO: function (state, video) {
      state.current_video = video
    },
    SET_CURRENT_ARTIST: function (state, artist) {
      state.current_artist = artist
    },
    SET_CURRENT_ALBUM: function (state, album) {
      state.current_album = album
    },
    SET_CURRENT_SONG: function (state, song) {
      state.current_song = song
      console.log('current track', state.current_song)
    },
    SET_VIDEOS: function (state, videos) {
      state.videos.splice(0, state.videos.length)
      state.videos = videos
    },
    SET_TRACKS: function (state, payload) {
      state.tracks.splice(0, state.tracks.length)
      state.tracks = payload
    },
    SET_ALBUMS: function (state, payload) {
      state.albums.splice(0, state.albums.length)
      state.albums = payload
    },
    SET_POPULAR_ARTIST: function (state, payload) {
      state.popularArtist.splice(0, state.popularArtist.length)
      state.popularArtist = payload
    },
    SET_POPULAR_COUNTRY: function (state, payload) {
      state.popularCountry.splice(0, state.popularCountry.length)
      state.popularCountry = payload
    }
  },
  actions: {
    SET_CURRENT_VIDEO: function (context, video) {
      context.commit('SET_CURRENT_VIDEO', video)
    },
    SET_CURRENT_ARTIST: function (context, artist) {
      context.commit('SET_CURRENT_ARTIST', artist)
    },
    SET_CURRENT_ALBUM: function (context, album) {
      context.commit('SET_CURRENT_ALBUM', album)
    },
    SET_CURRENT_TRACK: function (context, song) {
      context.commit('SET_CURRENT_SONG', song)
    },
    SET_VIDEOS: function (context, videos) {
      context.commit('SET_VIDEOS', videos)
    },
    SET_ALBUMS: function (context, payload) {
      context.commit('SET_ALBUMS', payload)
    },
    SET_TRACKS: function (context, payload) {
      context.commit('SET_TRACKS', payload)
    },
    SET_ARTIST_POPULAR_SONGS: function (context, payload) {
      context.commit('SET_POPULAR_ARTIST', payload)
    },
    SET_COUNTRY_POPULAR_SONGS: function (context, payload) {
      context.commit('SET_POPULAR_COUNTRY', payload)
    }
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
