<template>
  <div class="home">
    <b-container fluid>
      <scrollable-div>
        <video-holder v-for="i in 10" :key="i"></video-holder>
      </scrollable-div>
      <scrollable-div />
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import ScrollableDiv from '@/components/ScrollableDiv.vue'

export default {
  name: 'HomeView',
  components: {
    ScrollableDiv
  }
}
</script>
