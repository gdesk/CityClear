<template>
  <div class="forum">
		<b-container fluid class ="forum-container">
			<div  class="flex-container">
				<b-button href="/forum/add/discussion" pill variant="success">Crea discussione</b-button>	
				<b-button href="/forum/add/event" pill variant="success">Crea evento</b-button>
			</div>	
			<b-row order="1">
				<br> <br> <br> <h3>Discussioni</h3>  <br> <br>
				<div class="flex-container">
					<div v-for="discussion in discussions" :key=discussion._id >
						<b-card :title=discussion.title :sub-title=discussion.fullname>
							<b-card-text>
								{{discussion.description}}
							</b-card-text>
							<a v-bind:href="'/forum/discussion/'+ discussion._id" class="card-link">Visualizza e Rispondi</a>
							
						</b-card>
					</div>
				</div>				
			</b-row>	
			<b-row order="2">
				<br> <br> <br> <h3>Eventi</h3> <br> <br>
				<div class="flex-container">
					<div v-for="event in events" :key=event._id >
						<b-card :title=event.title :sub-title=event.fullName>
							<b-card-text>
								{{event.description}}
							</b-card-text>
							<b-card-text>
								{{event.eventDate}} alle {{event.hour}} <br><br>
								{{event.location}}
							</b-card-text>

							<a v-bind:href="'/forum/event/'+ event._id" class="card-link">Visualizza e Partecipa</a>
							
						</b-card>
					</div>
				</div>								
			</b-row>
		</b-container>
  </div>
</template>

<script>
	
	const axios = require("axios");
	const BASE_PATH = sessionStorage.urlHost;
	const DISCUSSION_PATH = `${BASE_PATH}/allDiscussion`;
	const EVENT_PATH = `${BASE_PATH}/allEvent`;
	export default {
		name: 'Forum',
		data() {
			return{
				discussions:[],
				events:[]
			}
        },
        mounted() {
			this.getAllDiscussions();
			this.getAllEvents();
        },
		methods: {
			getAllDiscussions(){
                axios
                    .put(DISCUSSION_PATH, {
						collection: sessionStorage.getItem("district").toLowerCase()+".discussions"
					})
                    .then(response => {
						console.log("response:   "+JSON.stringify(response.data[0]));
						this.discussions = response.data;
					})
			},
			getAllEvents(){
				axios
					.put(EVENT_PATH, {
					})
                    .then(response => {
						console.log("response:   "+JSON.stringify(response.data));
						this.events = response.data;
					})
			}
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
		padding: 2%;
	}
	.flex-container {
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		background-color: transparent;
		align-content: center;
	}
	.btn {
		width: 180px;
		height: 40px;
		text-align: center;
		margin-top: 20px;
		margin-bottom: 20px;
		margin-left: 18%;
		margin-right: 18%;
	}
	@media (max-width: 800px) {
		.row {
			width: 100%;
			align-content: center;
		}
	}
</style>