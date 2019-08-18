<template>
  <div class="login">
		<b-container id="login-form" fluid class ="login-form">
		
			<b-row order="1">
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
            
                        <b-button type="submit" pill variant="success"> Crea </b-button>	
                    </form>
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
            
                        <b-button type="submit" pill variant="success"> Crea </b-button>	
                    </form>
                </div>
				
			</b-row>	
		</b-container>
  </div>
</template>

<script>
	const axios = require("axios");
	const BASE_PATH = "http://127.0.0.1:5051";
	const CREATE_EVENT_PATH = `${BASE_PATH}/createEvent`;
	const CREATE_DISCUSSION_PATH = `${BASE_PATH}/createDiscussion`;
	export default {
		name: 'addForum',
		props: ["logged"],
		data() {
			return{
				title: "",
				description: "",
				fullname: "",
				eventDate: "",
				hour: "",
				location: ""
			}
		},
		methods: {
			createEvent() {	
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
						console.log(response.data);
					})				
			},
			createDiscussion(){
				axios
					.post(CREATE_DISCUSSION_PATH, {
						title: this.title,
						description: this.description,
						username:window.sessionStorage.getItem("user"),
						fullname: this.fullname
					})
					.then(response => {
						console.log(response.data);
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
	}

	span {
		font-weight: bolder; 
	}

	p, .district-link {
		font-size: 15px;
		font-weight: bolder; 
		color: #000000;
	}

	input, select {
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
		.row {
			width: 100%;
			align-content: center;
		}

		input, select {
			width: 270px;
		}
	}

	.btn {
		width: 140px;
		height: 40px;
		text-align: center;
		margin-top: 20px;
		margin-bottom: 20px;
	}

	.icon{
		margin-right: 20px;
		width: 20px;
		height: 100%;
		text-align: center;
	}

	@media (max-width: 340px) {
		input, select {
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