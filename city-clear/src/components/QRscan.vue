<template>
  <div>
    <h2>{{this.$route.params.title}}</h2>
    <p class="error">{{ error }}</p>
    <p><br>{{ output }} </p>
    <qrcode-stream @decode="onDecode" @init="onInit" />
  </div>
</template>

<script>
  import { QrcodeStream } from 'vue-qrcode-reader'
  const axios = require("axios");
	const BASE_PATH = sessionStorage.urlHost;
	const POINT_PATH = `${BASE_PATH}/users/point`;
  export default {
    components: { QrcodeStream },
    data () {
      return {
        result: '',
        error: '',
        output: ''
      }
  },
  mounted() {
    this.getPoint()
  },
  methods: {
    onDecode (result) {
      this.result = result
      if(this.result === this.$route.params.id) {
        this.incPoint();
      }
    },
    getPoint(){
				let currentObj = this;
				axios
					.put(POINT_PATH, {
						user: window.sessionStorage.getItem("user"),
					})
					.then(response => {
						//currentObj.output = response.data;
						this.userPoint = response.data.point
					})
					.catch(error => {
						currentObj.output = error.message;
					})
		},
    incPoint(){
      let currentObj = this;
      axios
        .patch(POINT_PATH, {
          user: window.sessionStorage.getItem("user"),
          point: this.userPoint + 5
        }) 
        .then(
          currentObj.output = "+5 punti game!"
        )
    },
    async onInit (promise) {
      try {
        await promise
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          this.error = "ERROR: you need to grant camera access permisson"
        } else if (error.name === 'NotFoundError') {
          this.error = "ERROR: no camera on this device"
        } else if (error.name === 'NotSupportedError') {
          this.error = "ERROR: secure context required (HTTPS, localhost)"
        } else if (error.name === 'NotReadableError') {
          this.error = "ERROR: is the camera already in use?"
        } else if (error.name === 'OverconstrainedError') {
          this.error = "ERROR: installed cameras are not suitable"
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = "ERROR: Stream API is not supported in this browser"
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import 'node_modules/bootstrap/scss/bootstrap';
	@import 'node_modules/bootstrap-vue/src/index.scss';

  .error {
    font-weight: bold;
    color: red;
  }
  p {
		font-size: 15px; 
		color: #000000;
	}
</style>