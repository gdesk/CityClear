<template>
	<div class="forum-discussion">
		<b-container fluid class ="forum-container">
			<b-row order="1">
				<h2>{{this.title}}</h2>
				<br>
				<b-card :title="''+ this.eventDate+ ' alle '+this.hour" :sub-title=this.location>
					<b-card-text>
						{{this.description}}
					</b-card-text>
					<b-card-text>
						Numero Partecipanti: {{this.people}}
					</b-card-text>
				</b-card>
				<div v-if="isOwner==true">
					<br> <br> <br>
					<p> Per poter permettere agli altri utenti di guaganare i propri punti game: <br><br>
						1. Scarica il QRCode, <br> 
						2. stampalo <br>
						3. rendilo disponibile per il giorno dell'evento.
					</p> 
					<br> <br>
					<div ref="child" id="QRcode" class="hide">
						<qrcode-vue :value="value" :size="size" level="H"></qrcode-vue>
					</div>
					<b-button @click="downloadQRCode" pill variant="success"><v-icon name="download"></v-icon>&nbsp;Download QRcode</b-button>
				</div>
				<div v-else>
					<div v-if="isPartecipant=='yes'">
						<br> <br> <br>
						<p>Non vuoi più partecipare? avvisaci.</p> 
						<b-button @click="decPeople" pill variant="success"><v-icon name="minus"></v-icon></b-button> <br>
						<b-button id="scanBtn" @click="scanQR" pill variant="success"><img src="../assets/qrcode.png">Scanner QRcode</b-button>
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
			<span>
				<br><p>{{output}}</p>
			</span>	
		</b-container>
	</div>
</template>

<script>
	import QrcodeVue from 'qrcode.vue'
	import domtoimage from 'dom-to-image'
	const axios = require("axios");
	const BASE_PATH = sessionStorage.urlHost;
	const EVENT_PATH = `${BASE_PATH}/singleEvent`;
	const MODIFIED_PEOPLE_PATH = `${BASE_PATH}/modifiedPeople`;
	export default {
		name: 'SingleEvent',
		data() {
			return{
                id: "",
                title:"",
                description:"",
                user: "",
                fullname:"",
                date:"",
                eventDate:"",
                hour:"",
                location:"", 
				people:"",
				isPartecipant:"",
				output: "",
				isOwner: false,
				partecipants:[],
				value: ''
			}
        },
        mounted() {
			this.isPartecipant = sessionStorage.getItem(this.$route.params.id)
			this.getEvent();
		},
		components: {
			QrcodeVue,
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
                        this.user = response.data[0].username;
                        this.fullname = response.data[0].fullname;
                        this.date = response.data[0].date;
                        this.eventDate = response.data[0].eventDate;
                        this.hour = response.data[0].hour;
                        this.location = response.data[0].location;
						this.people = response.data[0].people;
						this.partecipants = response.data[0].partecipants;

						if(this.user === window.sessionStorage.getItem("user")){
							this.isOwner = true;
							this.value = this.id;
							document.getElementById('QRcode').style.visibility="visible";
						}
						this.checkScan();
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
			downloadQRCode(){
				//document.getElementById('QRcode').style.visibility="visible";
				domtoimage.toJpeg(document.getElementById('QRcode'), { quality: 0.5, bgcolor: "white" })
					.then(function (dataUrl) {
						var link = document.createElement('a');
						link.download = 'eventQRcode.jpeg';
						link.href = dataUrl;
						link.click();
					});
			}, 
			scanQR(){
				this.$router.push('../../QRscan/' + this.title + '/' + this.id)
			},
			checkScan(){
				console.log(this.partecipants.includes(window.sessionStorage.getItem("user")))
				if(this.partecipants.includes(window.sessionStorage.getItem("user"))){
					document.getElementById('scanBtn').disabled = true;
				} else {
					document.getElementById('scanBtn').disabled = false;
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	@import 'node_modules/bootstrap/scss/bootstrap';
	@import 'node_modules/bootstrap-vue/src/index.scss';
	img {
		width: 10%;
		height: auto;
		margin-right: 3%;
	}
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