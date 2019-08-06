<template>
  <div class="user-profile">
		<b-container fluid class ="login-form">
            <b-row>
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
				photo: require("../assets/user_profile.png"),
				email: "Email",
				name: "Nome Cognome",
				birtdate: "Compleanno",
				district: "Comune",
				modifierPassword: "",
				modifierConfirmPassword: "",
				output: ""
			}
        },
        mounted() {
            this.getUser();
        },
		methods: {
			uploadImage(event) {
				const image = event.target.files[0];
				const reader = new FileReader();
				reader.readAsDataURL(image);
				reader.onload = e =>{
					this.photo = e.target.result;
					console.log(this.previewImage);
				};
				
				// TODO: richiesta va bene ma photo in db = {}.
				const storePhoto = new FormData();
				storePhoto.append(this.image);
				axios
					.patch(`${USER_PATH}/uploadFile`, {
						user: window.sessionStorage.getItem("user"),
						photo: storePhoto
					})
					.then(response =>{
						console.log(response.data);
					})
			},
            getUser(){
                axios
                    .put(USER_PATH, {
						user: window.sessionStorage.getItem("user")
					})
                    .then(response => {
						if(response.data.photo != null) {
							this.photo = response.data.photo
						}
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