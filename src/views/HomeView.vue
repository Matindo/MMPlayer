<template>
  <b-container fluid>
    <scrollable-div title="Popular Videos"/>
    <scrollable-div title="Newest Videos"/>
  </b-container>
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
