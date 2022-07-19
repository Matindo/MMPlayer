<template>
 <div class="album">
  <span>{{album}}</span>
 </div>
</template>

<script>
export default {
  name: 'AlbumHolder',
  props: {
    album: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.album {
  width:fit-content;
  height: 30px;
  background: rgb(201, 182, 150);
  color: rgb(17, 49, 17);
  border-radius: 5%;
  margin: 2px;
}
</style>
