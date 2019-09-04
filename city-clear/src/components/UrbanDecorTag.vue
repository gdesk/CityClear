<template>
  <div class="urban-decor-tag">
      <b-container fluid class ="map">
			<b-row order="1">
                <decor-map></decor-map>
			</b-row>
        </b-container>
  </div>
</template>

<script>
    import DecorMap from './DecorMap'
	export default {
		name: 'UrbanDecorTag',
        props: {},
        components: {
            DecorMap
        }
    }
</script>

<style scoped lang="scss">
	@import 'node_modules/bootstrap/scss/bootstrap';
	@import 'node_modules/bootstrap-vue/src/index.scss';
	.row{
		width: 50%;
		height: auto;
		display: inline-table;
	}
</style>

