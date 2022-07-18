<template>
  <div class="video-holder">
    <div class="thumbnail">
      <b-img :src="video.snippet.thumbnails.medium.url" :alt="video.snippet.title"></b-img>
    </div>
    <div class="details">
      <div class="title">
        <h3>
          {{video.snippet.title}}
        </h3>
        <div class="sub">
          <a href="">
            {{video.snippet.channelTitle}}
          </a>
          <span>{{video.snippet.date}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'VideoHolder',
  props: {
    video: Object
  },
  computed: {
    date: function () {
      return moment(this.video.snippet.publishedAt, moment.ISO_8601).format('LLL')
    }
  }
}
</script>

<style lang="scss" scoped>

.video-holder {
  width: 270px;
  border-radius: 5%;
  margin-bottom: 1.2rem;
  display: inline-block;
  background: rgba(0, 0, 0, 0);
}

.video-holder :hover {
  box-shadow: 0px 0px 15px 1px rgba(0, 255, 234, 0.448);
}

.video-holder > * :hover {
  box-shadow: none;
}

.thumbnail {
  width: 100%;
  height: 170px;
  box-shadow: none;
}

.thumbnail img {
  object-fit: cover;
  height: 94%;
  width: 100%;
}
.details {
  display: flex;
  box-shadow: none;
}

.title {
  display: flex;
  flex-direction: column;
}

.title h3 {
  color: rgb(239, 239, 239);
  line-height: 18px;
  font-size: 14px;
  margin-bottom: 6px;
}

.title a,
span {
  text-decoration: none;
  color: rgb(175, 175, 175);
  font-size: 12px;
}

.sub {
  display: inline-flexbox;
  flex-direction: row;
}

.sub span {
  float: right;
}
</style>
