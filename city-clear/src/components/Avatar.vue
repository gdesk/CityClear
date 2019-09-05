<template>
  <div class="avatar">
		<b-container fluid class ="avatar-container">
            <b-row>
				<img :src="photo" class="user-img"/>
				<br><br><br>
                <img :src="avatar" class="avatar-img"/>
                {{name}}<br><br>
				<div>
					<b-progress show-value striped height="20px" :max="max" class="mb-3">
						<b-progress-bar variant="primary" :value="values" :label="`${values}`" animated show-progress></b-progress-bar>
					</b-progress>
				</div>
				<br><br><br><br>
                <h3>Livello: {{level}} <h4>Punti: {{point}}</h4></h3> 
			</b-row>
		</b-container>
  </div>
</template>

<script>
	const axios = require("axios");
	const BASE_PATH = sessionStorage.urlHost;
	const USER_PATH = `${BASE_PATH}/users`;
	const POINT_PATH = `${BASE_PATH}/users/point`;
	export default {
		name: 'Avatar',
		data() {
			return{
				photo: require("../assets/user_profile.png"),
                name: "Nome Cognome",
                level: "1",
				point: 0, 
				values: 0,
				max: 60,
				avatar: require("../assets/bronze.png")
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
                        this.name = response.data.name,
						this.point = response.data.point,
						this.values = response.data.point,
						this.photo = sessionStorage.getItem(window.sessionStorage.getItem("user")) || require("../assets/user_profile.png"),
						this.level = this.checkLevel()
					})
			},
			checkLevel() {
				if(this.point < 20) 
					return this.level = 1;
				else if(this.point >= 20 && this.point < 40) {
					this.avatar = require("../assets/silver.png");
					return this.level = 2;
				}
				else {
					this.avatar = require("../assets/gold.png");
					return this.userlevelLevel = 3;
				}
			},
			setLevel() {
				axios
					.patch(POINT_PATH, {
						user: window.sessionStorage.getItem("user"),
						point: this.point,
						level: this.level
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
    img.user-img{
        width: 250px;
        height: auto;
    }
	img.avatar-img{
        width: 100px;
        height: auto;
    }
	@media (max-width: 800px) {
		img.user-img {
			width: 30%;
		}
		img.avatar-img {
			width: 50px;
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