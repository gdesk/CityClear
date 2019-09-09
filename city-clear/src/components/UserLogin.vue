<template>
  <div class="login">
		<b-container fluid class ="login-form">
			<b-row order="1">
				<span>Login:</span> <br>
				<form @submit="onLogin">
					<v-icon name="mail"></v-icon>
					<input v-model="loginEmail" type="email" placeholder="email@domain.it" required/><br>
					<v-icon name="lock"></v-icon>
					<input v-model="loginPassword" type="password" placeholder="password" required/><br>
					<b-button type="submit" pill variant="success"> Accedi </b-button>
				</form>
				<span>
					<br><p>{{outputLogin}}</p>
				</span>
				<router-link to="/district-login" class="district-link">Sei un comune? Clicca qui per accedere</router-link> <br><br><br>
			</b-row>	
			<b-row order="2">
				<span>Crea un nuovo account:</span> <br>
				<form @submit="onRegister">
					<v-icon name="mail"></v-icon>
					<input v-model="registerEmail" type="email" placeholder="email@domain.it" required/> <br>
					<v-icon name="user"></v-icon>
					<input v-model="registerName" type="text" placeholder="Maria Rossi" required/> <br>
					<v-icon name="gift"></v-icon>
					<input v-model="registerDate" type="date" required/> <br>
					<v-icon name="home"></v-icon>
					<select v-model="districtRegister" required>
						<option disabled value="">Comune di interesse</option>
						<option>Cesena</option>
					</select> <br>
					<v-icon name="lock"></v-icon>
					<input v-model="registerPassword" type="password" placeholder="password" required/> <br>
					<v-icon name="lock"></v-icon>
					<input v-model="registerConfirmPassword" type="password" placeholder="confirm password" required/><br>
					<b-button type="submit" pill variant="success"> Iscriviti </b-button>	
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
	const BASE_PATH = sessionStorage.urlHost;
	const USER_PATH = `${BASE_PATH}/users`;
	export default {
		name: 'Login',
		props: ["logged"],
		data() {
			return{
				loginEmail: "",
				loginPassword: "",
				registerEmail: "",
				registerName: "",
				registerDate: "",
				districtRegister: "",
				registerPassword: "",
				registerConfirmPassword: "",
				output: "",
				outputLogin: ""
			}
		},
		methods: {
			onLogin(event){
				event.preventDefault();
				let currentObj = this;
				axios
					.put( `${BASE_PATH}/login`, {
						email: this.loginEmail,
						password: this.loginPassword
					})
					.then(response => {
						//currentObj.outputLogin = response.data;
						EventBus.$emit("login");
						window.sessionStorage.setItem("user", response.data);
						//console.log(response.data.district);
						this.setUserDistrict();
						//currentObj.outputLogin = sessionStorage.user;
						currentObj.$router.push('./urban-decore-tag') 
					})
					.catch(error => {
						if (error.response)
							currentObj.outputLogin = "Errore, dati inseriti non corretti!";
						else
							currentObj.outputLogin = error.message;
					})
				
			},
			checkPassword() {
				return this.registerPassword === this.registerConfirmPassword;
			},
			onRegister(event) {
				event.preventDefault();
				let currentObj = this;
				if(this.checkPassword()) {
					axios
						.post(USER_PATH, {
							email: this.registerEmail,
							name: this.registerName,
							birtdate: this.registerDate,
							district: this.districtRegister,
							password: this.registerPassword
						})
						.then(response => {
							currentObj.output = response.data;
							this.registerEmail = "",
							this.registerName = "",
							this.registerDate = "",
							this.districtRegister = "",
							this.registerPassword = "",
							this.registerConfirmPassword = ""
						})
						.catch(error => {
							if (error.response)
								currentObj.output = this.registerEmail + " già utilizzato!";
							else
								currentObj.output = error.message;
						})
				} else currentObj.output = "Le password non corrispondono";
			},
			setUserDistrict(){
                axios
                    .put(USER_PATH, {
						user: window.sessionStorage.getItem("user")
					})
                    .then(response => {
						window.sessionStorage.setItem("district", response.data.district)
						
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