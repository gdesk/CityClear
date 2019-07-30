<template>
  <div class="login">
		<b-container fluid class ="login-form">
			<b-row order="1">
				<span>Login:</span> <br>
				<v-icon name="mail"></v-icon>
				<input v-model="loginEmail" type="email" placeholder="email@domain.it" required/><br>
				<v-icon name="lock"></v-icon>
				<input v-model="loginPassword" type="password" placeholder="password" required/><br>
				<b-button pill variant="success"> Accedi </b-button>
			</b-row>	
			<b-row order="2">
				<span>Crea un nuovo account:</span> <br>
				<form @submit="register">
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
					<button pill variant="success"> Iscriviti </button>	
				</form>
				<strong>Output:</strong>
                        <pre>
                        {{output}}
                        </pre>
			</b-row>
		</b-container>
  </div>
</template>

<script>
const axios = require("axios");

	export default {
		name: 'Login',
		props: {},
		data() {
			return{
				registerEmail: "",
				registerName: "",
				registerDate: "",
				registerPassword: "",
				registerConfirmPassword: "",
				output: ""
			}
		},
		methods: {
			//checkPassword() {
			//	return this.registerPassword == this.registerConfirmPassword;
			//},
			register(event) {
				event.preventDefault();
				let currentObj = this;
				//const baseDomain = "http://localhost:5051/users";
				//const baseURL = `${baseDomain}/users`;
				axios
					.post("http://localhost:5051/users", {
						email: this.registerEmail,
						name: this.registerName,
						birtdate: this.registerDate,
						password: this.registerPassword
					})
					.then(response => {
						currentObj.output = response.data;
					})
					.catch(error => {
						currentObj.output = error;
					});
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