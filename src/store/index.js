import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    current_video: {},
    videos: []
  },
  getters: {
    CURRENT_VIDEO: function (state) {
      return state.current_video
    },
    VIDEOS: function (state) {
      return state.videos
    }
  },
  mutations: {
    SET_CURRENT_VIDEO: function (state, video) {
      state.current_video = video
    },
    SET_VIDEOS: function (state, videos) {
      state.videos.splice(0, state.videos.length)
      state.videos = videos
    }
  },
  actions: {
    SET_CURRENT_VIDEO: function (context, video) {
      context.commit('SET_CURRENT_VIDEO', video)
    },
    SET_VIDEOS: function (context, videos) {
      context.commit('SET_VIDEOS', videos)
    }
  },
  modules: {
  }
})
