<template>
  <div class="forum-discussion">
		<b-container fluid class ="forum-container">
			<b-row order="1">
				<h2>{{this.title}}</h2>
				<br>
				<div class="flex-container">
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
                   
				</div>				
			</b-row>	
		</b-container>
  </div>
</template>

<script>
	const axios = require("axios");
	const BASE_PATH = "http://127.0.0.1:5051";
	const EVENT_PATH = `${BASE_PATH}/singleEvent`;
	const ADD_PEOPLE_PATH = `${BASE_PATH}/addPeople`;
	const DEC_PEOPLE_PATH = `${BASE_PATH}/decPeople`;
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
				people:"",
				isPartecipant:""
			}
        },
        mounted() {
			this.isPartecipant = sessionStorage.getItem(this.$route.params.id)
			this.getEvent();
        },
		methods: {
            getEvent(){
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
            addPeople(){
				this.people = parseInt(this.people)+1;
				sessionStorage.setItem(this.id, "yes")
				this.isPartecipant=sessionStorage.getItem(this.id)
				console.log(" sotto  "+sessionStorage[this.id]);
				
				axios
                    .put(ADD_PEOPLE_PATH, {
						id: this.$route.params.id,
						people: this.people
					})
                    .then(response => {
                        console.log("response  "+ response)
                    })
			},
			decPeople(){
				this.people = parseInt(this.people)-1;
				sessionStorage.setItem(this.id, "no")
				this.isPartecipant=sessionStorage.getItem(this.id);
				console.log(" sotto  "+sessionStorage[this.id]);

				axios
                    .put(DEC_PEOPLE_PATH, {
						id: this.$route.params.id,
						people: this.people
					})
                    .then(response => {
                        console.log("response  "+ response)
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

	p {
		font-size: 15px;
		font-weight: bolder; 
		color: #000000;
	}

    img {
        width: 25%;
        height: auto;
    }

	input {
		outline: 0;
		box-sizing: border-box;
		font-size: 14px;
		padding: 5px;
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

	@media (max-width: 800px) {
		.row {
			width: 100%;
		}
		input {
			width: 270px;
		}
		img {
			width: 30%;
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

	.icon{
		width: 20px;
		height: 100%;
		text-align: center;
	}

	#add-photo{
		width: 50px;
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