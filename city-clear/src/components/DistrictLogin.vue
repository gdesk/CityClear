<template>
  <div class="login">
		<b-container fluid class ="login-form">
			<b-row order="1">
				<span>Login:</span> <br>
				<form @submit="onLogin">
					<v-icon name="mail"></v-icon>
					<input v-model="loginEmail" type="email" placeholder="email@domain.it" required/><br>
                    <v-icon name="home"></v-icon>
					<select v-model="loginDistrict" required>
						<option disabled value="">Comune</option>
						<option>Cesena</option>
					</select> <br>
					<v-icon name="lock"></v-icon>
					<input v-model="loginPassword" type="password" placeholder="password" required/><br>
					<b-button type="submit" pill variant="success"> Accedi </b-button>
				</form>
				<span>
					<br><p>{{output}}</p>
				</span>
				<router-link to="/login" class="user-link">Sei un cittadino? Clicca qui per accedere</router-link><br><br>
			</b-row>	
			<b-row order="2">
				<span>Crea un nuovo account:</span> <br><br>
				Conattaci per creare un nuovo account comune! <br><br> Per motivi di sicurezza lo staff di city clear dovrà procedere ad effettuare 
				le dovute verifiche <br> di autenticità dei dati forniti prima di procedere all'inscrizione del comune sul canale.
				<br><br><br>
				Per maggiori informazioni contattare:
				<br><br>
				<v-icon name="phone"></v-icon>0544 203050<br>
				<v-icon name="mail"></v-icon>cityclear@info.com
			</b-row>
		</b-container>
  </div>
</template>

<script>
	import { EventBus } from "../main.js"
	const axios = require("axios");
	const BASE_PATH = sessionStorage.urlHost;
	const DISTRICT_PATH = `${BASE_PATH}/loginDistrict`;
	export default {
		name: 'Login',
		props: ["districtLogged"],
		data() {
			return{
                loginEmail: "",
                loginDistrict: "",
				loginPassword: "",
				output: ""
			}
		},
		methods: {
			onLogin(event){
				event.preventDefault();
				let currentObj = this;
				axios
					.put(DISTRICT_PATH, {
                        email: this.loginEmail,
                        district: this.loginDistrict,
                        password: this.loginPassword
					})
					.then(response => {
						currentObj.output = response.data;
						EventBus.$emit("districtLogin");
						window.sessionStorage.setItem("type", "district");
						window.sessionStorage.setItem("user", response.data);
						window.sessionStorage.setItem("district", this.loginDistrict);
						currentObj.$router.push('./urban-decore-tag') 
					})
					.catch(error => {
						if (error.response)
							currentObj.output = "Errore, dati inseriti non corretti!";
						else
							currentObj.output = error.message;
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
	p, .user-link {
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