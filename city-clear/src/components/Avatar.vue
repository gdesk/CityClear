<template>
  <div class="avatar">
		<b-container fluid class ="avatar-container">
            <b-row>
				<img :src="photo" class="user-img"/>
				<br><br><br>
                <v-icon name="user"></v-icon>
                {{name}} <br><br>
				<div>
					<b-progress show-value striped :max="max" class="mb-3">
						<b-progress-bar variant="primary" :value="values" :label="`${values}`" animated show-progress></b-progress-bar>
					</b-progress>
				</div>
				<br><br><br><br>
                <h3>Livello: {{level}} <h4>Punti: {{point}}</h4></h3> &nbsp; 
			</b-row>
		</b-container>
  </div>
</template>

<script>
	const axios = require("axios");
	const BASE_PATH = "http://127.0.0.1:5051";
	const USER_PATH = `${BASE_PATH}/users`;
	export default {
		name: 'Avatar',
		data() {
			return{
				photo: require("../assets/user_profile.png"),
                name: "Nome Cognome",
                level: "1",
				point: 0, 
				values: 0,
				max: 60
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
						if(response.data.photo != null) {
							this.photo = response.data.photo
						}
						if(response.data.photo != null){
							this.photo = response.data.photo
						}
                        this.name = response.data.name,
                        this.level = response.data.level,
						this.point = response.data.point,
						this.values = response.data.point
						this.photo = sessionStorage.getItem(window.sessionStorage.getItem("user")) || require("../assets/user_profile.png")
					})
			}
		}
	}
</script>

<style scoped lang="scss">

	@import 'node_modules/bootstrap/scss/bootstrap';
	@import 'node_modules/bootstrap-vue/src/index.scss';

	.row{
		width: 100%;
		height: auto;
		display: inline-table;
	}

	span {
		font-weight: bolder; 
	}

    img {
        width: 300px;
        height: auto;
    }

	@media (max-width: 800px) {
		img {
			width: 30%;
		}
	}

	.icon{
		width: 20px;
		height: 100%;
		text-align: center;
    }

	@media (max-width: 340px) {
		.icon{
			margin-top: 10px;
		}
	}

</style>