<template>
  <div class="user-profile">
		<b-container fluid class ="login-form">
            <b-row>
				<div v-if="this.typeUser=='district'">
					<img :src="photo" class="user-img"/>
					<br><br><br>
					<v-icon name="mail"></v-icon>
					{{this.email}} <br>
					<v-icon name="home"></v-icon>
					{{this.area}} <br>
					<v-icon name="home"></v-icon>
					{{this.province}} <br>
					<v-icon name="home"></v-icon>
					{{district}} <br>
					<v-icon name="users"></v-icon>
					{{this.cityPerson}} <br><br><br>
					<b-button @click="onLogout" pill variant="success"> 
						Logout &nbsp; 
						<v-icon name="power"></v-icon>
					</b-button>
				</div>
				<div v-else>
					<img :src="photo" class="user-img"/> &nbsp;
					<input style="display: none" accept="image/*" type="file" @change="uploadImage" ref="input"> 
					<b-button id="add-photo" @click="$refs.input.click()" pill variant="success">
						<v-icon name="plus"></v-icon> 
					</b-button>
					<br><br><br>
					<v-icon name="mail"></v-icon>
					{{email}} <br>
					<v-icon name="user"></v-icon>
					{{name}} <br>
					<v-icon name="gift"></v-icon>
					{{birtdate}} <br>
					<v-icon name="home"></v-icon>
					{{district}} <br><br><br>
					<b-button @click="onLogout" pill variant="success"> 
						Logout &nbsp; 
						<v-icon name="power"></v-icon>
					</b-button>
				</div>
			</b-row>
			<b-row>
				<span>Modifica password</span>
				<form @submit="onModifierPassword">
                <v-icon name="lock"></v-icon>  &nbsp;
                <input v-model="modifierPassword" type="password" placeholder="nuova password" required/> <br>
                <v-icon name="lock"></v-icon>  &nbsp;
                <input v-model="modifierConfirmPassword" type="password" placeholder="conferma password" required/><br>
                <b-button type="submit" pill variant="success"> Modifica password</b-button>	
            </form>
            <span>
                <br><p>{{output}}</p>
            </span>
			</b-row>
		</b-container>
  </div>
</template>

<script>
	import { EventBus } from "../main.js"
	const axios = require("axios");
	const BASE_PATH = "http://127.0.0.1:5051";
	const USER_PATH = `${BASE_PATH}/users`;
	const DISTRICT_PATH = `${BASE_PATH}/district`;
	export default {
		name: 'UserProfile',
		props: ['logged', 'districtLogged'],
		data() {
			return{
				photo: require("../assets/user_profile.png"),
				email: "Email",
				name: "Nome Cognome",
				birtdate: "Compleanno",
				district: "Comune",
				area: "",
				province: "",
				cityPerson: "",
				modifierPassword: "",
				modifierConfirmPassword: "",
				output: "",
				typeUser : ""
			}
        },
        mounted() {
			this.typeUser = window.sessionStorage.getItem("type");
			if(this.typeUser =="district"){
				this.getDistrict();
			}else{
				this.getUser();
			}
            
        },
		methods: {
			uploadImage(e) {
				let files = e.target.files || e.dataTransfer.files;
				if (!files.length)
					return;
				let reader = new FileReader();
				let self = this;

				reader.onload = (e) => {
					sessionStorage.photo = e.target.result;
					sessionStorage.setItem(this.email, e.target.result);
					self.photo = e.target.result;
					//save to db
				};
				reader.readAsDataURL(event.target.files[0]);
			},
            getUser(){
                axios
                    .put(USER_PATH, {
						user: window.sessionStorage.getItem("user")
					})
                    .then(response => {
						this.email = response.data.email,
                        this.name = response.data.name,
                        this.birtdate = response.data.birtdate,
						this.district = response.data.district,
						this.photo = window.sessionStorage.getItem(this.email) || require("../assets/user_profile.png")
					})
			},
			getDistrict(){
                axios
                    .put(DISTRICT_PATH, {
						user: window.sessionStorage.getItem("user")
					})
                    .then(response => {
						this.email = response.data.email,
                        this.area = response.data.area,
                        this.province = response.data.province,
						this.district = response.data.district,
						this.cityPerson = response.data.cityPerson,
						this.photo = require("../assets/" + window.sessionStorage.getItem("district") + ".png")
					})
			},
			onLogout(event) {
				event.preventDefault();
				axios
					.put(`${BASE_PATH}/logout`)
				window.sessionStorage.clear();
				EventBus.$emit("logout");
				this.$router.push('/');
			},
			checkPassword() {
				return this.modifierPassword === this.modifierConfirmPassword;
			},
			onModifierPassword(event){
				event.preventDefault();
				let currentObj = this;
				if(this.typeUser =="district"){
					if(this.checkPassword()) {
					axios
						.patch(DISTRICT_PATH, {
							user: window.sessionStorage.getItem("user"),
							password: this.modifierPassword
						})
						.then(response => {
							currentObj.output = response.data;
							this.modifierPassword = "";
							this.modifierConfirmPassword = "";
						})
						.catch(error => {
							currentObj.output = error.message;
						})
					} else currentObj.output = "Le password non corrispondono";
				} else {
					if (this.checkPassword()) {
					axios
						.patch(USER_PATH, {
							user: window.sessionStorage.getItem("user"),
							password: this.modifierPassword
						})
						.then(response => {
							currentObj.output = response.data;
							this.modifierPassword = "";
							this.modifierConfirmPassword = "";
						})
						.catch(error => {
							currentObj.output = error.message;
					})
				} else currentObj.output = "Le password non corrispondono";
				}
				
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
        width: 35%;
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