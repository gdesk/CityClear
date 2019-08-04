<template>
  <div class="user-profile">
		<b-container fluid class ="login-form">
            <b-row>
				<img src="../assets/user_profile.png"/> <br><br><br>
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
			</b-row>
			<b-row>
				<span>Modifica password</span>
				<form @submit="onModifierPassword">
                <v-icon name="lock"></v-icon>
                <input v-model="modifierPassword" type="password" placeholder="nuova password" required/> <br>
                <v-icon name="lock"></v-icon>
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
	export default {
		name: 'UserProfile',
		props: ['logged', 'districtLogged'],
		data() {
			return{
				email: "Email",
				name: "Nome Cognome",
				//birtdate: "",
				district: "Cesena",
				modifierPassword: "",
				modifierConfirmPassword: "",
				output: ""
			}
        },
        mounted() {
            this.getUser();
        },
		methods: {
            getUser(){
                axios
                    .put(USER_PATH, {
						user: window.sessionStorage.getItem("user")
					})
                    .then(response => {
                        this.email = response.data.email,
                        this.name = response.data.name,
                        this.birtdate = response.data.birtdate,
                        this.district = response.data.district
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
				if(this.checkPassword()) {
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