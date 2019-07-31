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
	const axios = require("axios");
	const BASE_PATH = "http://localhost:5051";
	const USER_PATH = `${BASE_PATH}/users`;
	export default {
		name: 'Login',
		props: {},
		data() {
			return{
				loginEmail: "",
				loginPassword: "",
				registerEmail: "",
				registerName: "",
				registerDate: "",
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
					.patch(USER_PATH, {
						email: this.loginEmail,
						password: this.loginPassword
					})
					.then(response => {
						currentObj.outputLogin = response.data;
						currentObj.$router.push('./urban-decore-tag') 
					})
					.catch(error => {
						if (error.response)
							currentObj.outputLogin = " Errore, dati inseriti non corretti!";
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
							password: this.registerPassword
						})
						.then(response => {
							currentObj.output = response.data;
							this.registerEmail = "",
							this.registerName = "",
							this.registerDate = "",
							this.registerPassword = "",
							this.registerConfirmPassword = ""
						})
						.catch(error => {
							if (error.response)
								//TODO: è imbrogliare
								currentObj.output = this.registerEmail + " già utilizzato!";
							else
								currentObj.output = error.message;
						})
				} else currentObj.output = "Le password non corrispondono";
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

	input {
		outline: 0;
		border: 0;
		padding: 15px;
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

	@media (max-width: 800px) {
		.row {
			width: 100%;
			align-content: center;
		}

		input {
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