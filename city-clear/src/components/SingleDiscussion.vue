<template>
  <div class="forum-discussion">
		<b-container fluid class ="forum-container">
			<b-row order="1">
				<h2>{{this.title}}</h2>
				<p>{{this.description}}</p>
				<br>
				<div class="flex-container">
					<div v-for="comment in comments" :key=comment._id >
						<b-card :title=comment.comment :sub-title=comment.date>
							<b-card-text>
								{{comment.user}}
							</b-card-text>
						</b-card>
					</div>
				</div>				
			</b-row>	
			<b-row order="2">
				<h5>Ora tocca a te. </h5><br><br><br>
				<div class="text-content">
					<textarea 
						v-model=comment 
						rows="10" 
						cols="78" 
						placeholder="Commenta anche tu">

					</textarea>
					<b-button type="submit" pill variant="success" @click="sendComment"> Invia</b-button>	
				</div>
			</b-row>
		</b-container>
  </div>
</template>

<script>
	const axios = require("axios");
	const BASE_PATH = "http://127.0.0.1:5051";
	const DISCUSSION_PATH = `${BASE_PATH}/singleDiscussion`;
	const ADD_DISCUSSION_PATH = `${BASE_PATH}/addComment`;
	export default {
		name: 'UserProfile',
		props: ['logged', 'districtLogged'],
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
						id: this.$route.params.id
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
						comment: this.comment
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

	.row{
		width: 50%;
		height: auto;
		display: inline-table;
	}

	.flex-container {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		background-color: transparent;
	}
	span {
		font-weight: bolder; 
	}

	p{
		font-size: 15px;
		color: #000000;
	}

	.text-comment{
		width: 50%;
		align-self: center;
		flex-direction: column;
		flex-wrap: wrap;
		
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