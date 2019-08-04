<template>
  <div class="forum">
		<b-container fluid class ="forum-container">
			<b-row order="1">
				<span>Discussioni:</span> <br>
			</b-row>	
			<b-row order="2">
				<span>Eventi:</span> <br>
			</b-row>
		</b-container>
  </div>
</template>

<script>
    export default {
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

	span {
		font-weight: bolder; 
	}

	@media (max-width: 800px) {
		.row {
			width: 100%;
			align-content: center;
		}
	}
</style>