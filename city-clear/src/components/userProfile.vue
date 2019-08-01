<template>
  <div class="user-profile">
		<b-container fluid class ="login-form">
            <img src="../assets/user_profile.png"/>
            <form @submit="onRegister">
                <v-icon name="mail"></v-icon>
                {{email}} <br>
                <v-icon name="user"></v-icon>
                {{name}} <br>
                <v-icon name="gift"></v-icon>
                {{birtdate}} <br>
                <v-icon name="home"></v-icon>
                {{district}} <br><br><br>
                <v-icon name="lock"></v-icon>
                <input v-model="modifierPassword" type="password" placeholder="nuova password" required/> <br>
                <v-icon name="lock"></v-icon>
                <input v-model="modifierConfirmPassword" type="password" placeholder="conferma password" required/><br>
                <b-button type="submit" pill variant="success"> Modifica password </b-button>	
            </form>
            <span>
                <br><p>{{output}}</p>
            </span>
		</b-container>
  </div>
</template>

<script>
	const axios = require("axios");
	const BASE_PATH = "http://localhost:5051";
	const USER_PATH = `${BASE_PATH}/users`;
	export default {
		name: 'UserProfile',
		data() {
			return{
				email: "",
				name: "",
				birtdate: "",
				district: "",
				modifierPassword: "",
				modifierConfirmPassword: "",
			}
        },
        mounted() {
            //this.getUser();
        },
		methods: {
            getUser(){
                axios
                    .get(USER_PATH)
                    .then(response => {
                        this.email = response.data.email,
                        this.name = response.data.name,
                        this.birtdate = response.data.birtdate,
                        this.district = response.data.district
                    })
            }
		}
	}
</script>

<style scoped lang="scss">

	@import 'node_modules/bootstrap/scss/bootstrap';
	@import 'node_modules/bootstrap-vue/src/index.scss';

	span {
		font-weight: bolder; 
	}

	p {
		font-size: 15px;
		font-weight: bolder; 
		color: #000000;
	}

    img {
        width: 15%;
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
		input {
			width: 270px;
		}
	}

	.btn {
		width: auto;
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