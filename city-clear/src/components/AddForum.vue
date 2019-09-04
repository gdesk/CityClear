<template>
  <div class="addForum">
		<b-container id="add-forum-form" fluid class ="add-forum-form">
                <div v-if="this.$route.params.what == 'event'" class="event-form">
                    <h3>Crea il tuo evento</h3> <br>
                    <form @submit="createEvent()" >
                        <v-icon name="star"></v-icon>
                        <input v-model="title"  type="text" placeholder="titolo" required/> <br>
                        <v-icon name="info"></v-icon>
                        <input v-model="description" type="text" placeholder="descrizione" required/> <br>
                        <v-icon name="user"></v-icon>
                        <input v-model="fullname" type="text" placeholder="nome cognome" /> <br>
                        <v-icon name="calendar"></v-icon>
                        <input v-model="eventDate" type="date" required/> <br>
                        <v-icon name="clock"></v-icon>
                        <input v-model="hour" type="time" required/> <br>
                        <v-icon name="home"></v-icon>
                        <input v-model="location" type="text" placeholder="luogo" required/> <br>
                        <b-button type="submit" pill variant="success">Crea</b-button>	
                    </form>
					<span>
						<p>{{eventOutput}}</p>
					</span>
                </div>
                <div v-else> 
                   <h3>Crea la tua discussione</h3> <br>
                    <form @submit="createDiscussion()" >
                        <v-icon name="star"></v-icon>
                        <input v-model="title"  type="text" placeholder="titolo" required/> <br>
                        <v-icon name="info"></v-icon>
                        <input v-model="description" type="text" placeholder="descrizione" required/> <br>
                        <v-icon name="user"></v-icon>
                        <input v-model="fullname" type="text" placeholder="nome cognome" /> <br>
                        <b-button type="submit" pill variant="success">Crea</b-button>
                    </form>
					<span>
						<p>{{discussionOutput}}</p>
					</span>
                </div>
		</b-container>
  </div>
</template>

<script>
	const axios = require("axios");
	const BASE_PATH = "http://127.0.0.1:5051";
	const CREATE_EVENT_PATH = `${BASE_PATH}/createEvent`;
	const CREATE_DISCUSSION_PATH = `${BASE_PATH}/createDiscussion`;
	const POINT_PATH = `${BASE_PATH}/users/point`;
	export default {
		name: 'addForum',
		data() {
			return{
				title: "",
				description: "",
				fullname: "",
				eventDate: "",
				hour: "",
				location: "",
				eventOutput: "",
				discussionOutput: "",
				userPoint: ""
			}
		},
		methods: {
			createEvent() {	
				let currentObj = this;
				axios
					.post(CREATE_EVENT_PATH, {
						title: this.title,
						description: this.description,
						username:window.sessionStorage.getItem("user"),
						fullname: this.fullname,
						eventDate: this.eventDate,
						hour: this.hour,
						location:this.location
					})
					.then(response => {
						console.log(response.data),
						this.getPoint(),
						currentObj.eventOutput = "Evento creato correttamente! + 10 punti Game! Torna nel forum per consultarlo.",
						this.title = "",
						this.description = "",
						this.fullname = "",
						this.eventDate = "",
						this.hour = "",
						this.location = ""
					})				
			},
			createDiscussion(){
				let currentObj = this;
				axios
					.post(CREATE_DISCUSSION_PATH, {
						title: this.title,
						description: this.description,
						username:window.sessionStorage.getItem("user"),
						fullname: this.fullname
					})
					.then(response => {
						console.log(response.data),
						currentObj.discussionOutput = "Discussione creata correttamente! Torna nel forum per consultarla.",
						this.title = "",
						this.description = "",
						this.fullname = ""
					})				
			},
			getPoint(){
				let currentObj = this;
				axios
					.put(POINT_PATH, {
						user: window.sessionStorage.getItem("user"),
					})
					.then(response => {
						//currentObj.output = response.data;
						this.userPoint = response.data.point;
						this.incPoint();
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
					point: this.userPoint + 10
				}) 
				.then(
					currentObj.pointOutput = "+10 punti game!",
				)
			}
		}
	}
</script>

<style scoped lang="scss">
	@import 'node_modules/bootstrap/scss/bootstrap';
	@import 'node_modules/bootstrap-vue/src/index.scss';

	span {
		font-weight: bolder; 
	}
	p {
		font-size: 15px;
		font-weight: bolder; 
		color: #000000;
	}
	input {
		outline: 0;
		box-sizing: border-box;
		font-size: 14px;
		align-self: center;
		width: 300px;
		height: 40px;
		margin-top: 15px;
		margin-bottom: 1px;
		border: 1px solid #cfd9db;
		background-color: #ffffff;
		border-radius: 0.25em;
		color: black;
	}
	input {
		padding: 5px;
	}
	@media (max-width: 800px) {
		input {
			width: 270px;
		}
	}
	.btn {
		width: 240px;
		height: 40px;
		text-align: center;
		margin-top: 20px;
		margin-bottom: 20px;
	}
	.icon {
		margin-right: 20px;
		width: 20px;
		height: 100%;
		text-align: center;
	}
	@media (max-width: 340px) {
		input {
			width: 250px;
		}
		.btn {
			width: 120px;
		}
		.icon{
			margin-top: 10px;
		}
	}
</style>