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
				<router-link to="/login" class="user-link">Sei un cittadino? Clicca qui per accedere</router-link>
			</b-row>	
			<b-row order="2">
				<span>Crea un nuovo account:</span> <br>
				Conattaci per creare un nuovo account comune, dopo che avremmo effettuato le dovute verifiche, procederemo a contattarla.
			</b-row>
		</b-container>
  </div>
</template>

<script>
	import { EventBus } from "../main.js"
	const axios = require("axios");
	const BASE_PATH = "http://localhost:5051";
	const DISTRICT_PATH = `${BASE_PATH}/district`;
	export default {
		name: 'Login',
		props: ["logged"],
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
						sessionStorage.user = response.data;
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