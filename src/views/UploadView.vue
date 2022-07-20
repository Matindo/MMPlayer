<template>
 <b-container fluid>
  <b-row class="w-100 vid-uploader">
   <b-col cols="12">
    <h3 class="text-white">Upload Video</h3>
   </b-col>
   <b-col cols="12">
    <b-form @submit.prevent="submitVid">
     <b-form-file v-model="file1" :state="Boolean(file1)" accept="video/*"  placeholder="Choose a file or drop it here..."
      drop-placeholder="Drop file here..." @change="handleFileUpload($event)"></b-form-file>
    </b-form>
   </b-col>
  </b-row>
  <b-row class="w-100 file-preview" align-h="around" align-v="start">
    <b-col cols="12" md="7">
      <h4>Preview file:</h4>
      <video v-show="file1 !== null" controls id="player"></video>
    </b-col>
  </b-row>
 </b-container>
</template>

<script>
export default {
  name: 'UploadView',
  data: function () {
    return {
      file1: null
    }
  },
  methods: {
    submitVid: function () {
      // handler
    },
    previewVideo: function () {
      const video = document.getElementById('player')
      const reader = new FileReader()

      reader.readAsDataURL(this.file1)
      reader.addEventListener('load', function () {
        video.src = reader.result
      })
    },
    handleFileUpload: function (event) {
      this.file1 = event.target.files[0]
      this.previewVideo()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
