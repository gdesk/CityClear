<template>
  <div class="forum-discussion">
		<b-container fluid class ="forum-container">
			<b-row order="1">
				<h2>{{this.title}}</h2>
				<p>{{this.description}}</p>
				<br>
					<div v-for="comment in comments" :key=comment._id >
						<b-card :title=comment.comment :sub-title=comment.date>
							<b-card-text>
								{{comment.user}}
							</b-card-text>
						</b-card>
					</div>	
					<br><br><br>			
			</b-row>	
			<b-row order="2">
				<h5>Ora tocca a te. </h5><br><br><br>
				<form v-on:submit.prevent id="text-form" class="text-content" @submit.prevent="writeMessage">
					<textarea form="text-form" v-model="comment" placeholder="Aggiungi un commento..."></textarea>
				</form>
				<b-button type="submit" pill variant="success" @click="sendComment">Pubblica</b-button>
			</b-row>
		</b-container>
  </div>
</template>

<script>
	const axios = require("axios");
	const BASE_PATH = sessionStorage.urlHost;
	const DISCUSSION_PATH = `${BASE_PATH}/singleDiscussion`;
	const ADD_DISCUSSION_PATH = `${BASE_PATH}/addComment`;
	export default {
		name: 'SigleDiscussion',
		data() {
			return{
                id: "",
                title:"",
                description:"",
                user:"",
                fullname:"",
                date:"",
                eventDate:"",
                hour:"",
				location:"",
				comments:[],
				comment:""
			}
        },
        mounted() {
            this.getDiscussion();
		},
		methods: {
            getDiscussion(){
                axios
                    .put(DISCUSSION_PATH, {
						id: this.$route.params.id,
						collection: sessionStorage.getItem("district").toLowerCase()+".discussions"
					})
                    .then(response => {
						this.id = this.$route.params.id;
                        this.title = response.data[0].title;
                        this.description = response.data[0].description;
                        this.user = response.data[0].user;
                        this.fullname = response.data[0].fullname;
						this.date = response.data[0].date;
						this.comments = response.data[0].comments
                    })
                    .then(err =>{
                        console.log("err:  " + err)
                    })
			},
			sendComment(){
				axios
                    .put(ADD_DISCUSSION_PATH, {
						id: this.$route.params.id,
						user: window.sessionStorage.getItem("user"),
						date: this.formatDate(new Date()), 
						comment: this.comment,
						collection: sessionStorage.getItem("district").toLowerCase()+".discussions"
					})
                    .then(response => {
						console.log(response);
					})
				this.comment = "";
				this.getDiscussion();

			},
			formatDate(date) {
				var monthNames = [
					"Gennaio", "Febbraio", "Marzo",
					"Aprile", "Maggio", "Giugno", "Luglio",
					"Agosto", "Settembre", "Ottobre",
					"Novembre", "Decembre"
				];

				var day = date.getDate();
				var monthIndex = date.getMonth();
				var year = date.getFullYear();

				return day + ' ' + monthNames[monthIndex] + ' ' + year;
			}
        }
	}
</script>

<style scoped lang="scss">

	@import 'node_modules/bootstrap/scss/bootstrap';
	@import 'node_modules/bootstrap-vue/src/index.scss';

	.row {
		width: 50%;
		height: auto;
		display: inline-table;
		padding: 2%;
	}
	span {
		font-weight: bolder; 
	}
	p {
		font-size: 15px;
		color: #000000;
	}
	form {
		display: flex;
		flex-direction: column;
	}
	textarea {	
		resize: none;
		min-height: 150px
	}
	@media (max-width: 800px) {
		.row {
			width: 100%;
		}
	}
	.btn {
		width: 250px;
		height: 40px;
		text-align: center;
		justify-content: center;
		margin-top: 20px;
		margin-bottom: 20px;
	}
	@media (max-width: 350px) {
		.btn {
			width: 120px;
		}
	}

</style>