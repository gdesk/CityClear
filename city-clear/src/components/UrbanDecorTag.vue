<template>
  <div class="urban-decor-tag">
      <span>STI GRANDISSIMI CAZZI</span>
      <b-container fluid class ="map">
			<b-row order="1">
				<decor-map><decor-map>
			</b-row>
        </b-container>
  </div>
</template>

<script>
    const axios = require("axios");
    import DecorMap from './DecorMap'
	export default {
		name: 'UrbanDecorTag',
        props: {},
    }
</script>

<style scoped lang="scss">
	span {
		font-weight: bolder; 
	}
</style>