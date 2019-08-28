<template>
  <div class="forum-discussion">
		<b-container fluid class ="forum-container">
			<b-row order="1">
				<h2>{{this.title}}</h2>
				<br>
				<!-- <div class="flex-container"> -->
				<b-card :title="''+ this.eventDate+ ' alle '+this.hour" :sub-title=this.location>
					<b-card-text>
						{{this.description}}
					</b-card-text>
					<b-card-text>
						Numero Partecipanti: {{this.people}}
					</b-card-text>
				</b-card>
				<div v-if="isPartecipant=='yes'">
					<br> <br> <br>
					<p>Non vuoi più partecipare? avvisaci.</p> 
					<b-button @click="decPeople" pill variant="success"><v-icon name="minus"></v-icon></b-button>
					<p>Porta con te chi vuoi. </p> 
					<b-button @click="addPeople" pill variant="success"><v-icon name="plus"></v-icon></b-button>
				</div>
				<div v-else>
					<br> <br> <br>
					<p>Partecipa anche tu.</p> 
					<b-button @click="addPeople" pill variant="success"><v-icon name="plus"></v-icon></b-button>
				</div>
				<!-- </div> -->	
			</b-row>	
		</b-container>
  </div>
</template>

<script>
	const axios = require("axios");
	const BASE_PATH = "http://127.0.0.1:5051";
	const EVENT_PATH = `${BASE_PATH}/singleEvent`;
	const MODIFIED_PEOPLE_PATH = `${BASE_PATH}/modifiedPeople`;
	export default {
		name: 'SingleEvent',
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
				people:"",
				isPartecipant:""
			}
        },
        mounted() {
			this.isPartecipant = sessionStorage.getItem(this.$route.params.id)
			this.getEvent();
        },
		methods: {
            getEvent() {
                axios
                    .put(EVENT_PATH, {
						id: this.$route.params.id
					})
                    .then(response => {
                        console.log("response  "+ response)
						this.id = this.$route.params.id;
                        this.title = response.data[0].title;
                        this.description = response.data[0].description;
                        this.user = response.data[0].user;
                        this.fullname = response.data[0].fullname;
                        this.date = response.data[0].date;
                        this.eventDate = response.data[0].eventDate;
                        this.hour = response.data[0].hour;
                        this.location = response.data[0].location;
						this.people = response.data[0].people;
                    })
                    .then(err =>{
                        console.log("err:  " + err)
                    })
            },
            addPeople() {
				this.people = parseInt(this.people)+1;
				sessionStorage.setItem(this.id, "yes")
				this.isPartecipant=sessionStorage.getItem(this.id)
				axios
                    .patch(MODIFIED_PEOPLE_PATH, {
						id: this.$route.params.id,
						people: this.people
					})
                    .then(response => {
						console.log("response  "+ response)
                    })
			},
			decPeople() {
				this.people = parseInt(this.people)-1;
				sessionStorage.setItem(this.id, "no")
				this.isPartecipant=sessionStorage.getItem(this.id);
				axios
                    .patch(MODIFIED_PEOPLE_PATH, {
						id: this.$route.params.id,
						people: this.people
					})
                    .then(response => {
						console.log("response  "+ response)
                    })
			},
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
	p {
		font-size: 15px;
		font-weight: bolder; 
		color: #000000;
	}
	.btn {
		width: 250px;
		height: 40px;
		text-align: center;
		justify-content: center;
		margin-top: 20px;
		margin-bottom: 20px;
	}
	.icon{
		width: 20px;
		height: 100%;
		text-align: center;
	}
	@media (max-width: 340px) {
		.btn {
			width: 120px;
		}
		.icon{
			margin-top: 10px;
		}
	}
</style>