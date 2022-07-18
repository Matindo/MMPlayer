<template>
 <b-row class="w-100">
  <b-col cols="4"><img :src="image" class="track-image" /></b-col>
  <b-col cols="2">
   <b-icon icon="play"></b-icon>
  </b-col>
  <b-col cols="6">
   <h2 class="track-title">{{ track.title }}</h2>
  </b-col>
 </b-row>
</template>

<script>
export default {
  name: 'SongHolder',
  props: {
    track: {
      type: Object,
      required: true
    }
  },
  computed: {
    image: function () {
      return this.track.image[0]['#text']
    }
  }
}
</script>

<style lang="scss" scoped>

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
</style>
