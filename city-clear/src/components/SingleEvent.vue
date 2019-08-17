<template>
  <div class="forum-discussion">
		<b-container fluid class ="forum-container">
			<b-row order="1">
				<h1>{{this.title}}</h1>
			</b-row>	
			<b-row order="2">
				<h1>{{this.title}} 222</h1>
			</b-row>
		</b-container>
  </div>
</template>

<script>
	const axios = require("axios");
	const BASE_PATH = "http://127.0.0.1:5051";
	const EVENT_PATH = `${BASE_PATH}/singleEvent`;
	export default {
		name: 'UserProfile',
		props: ['logged', 'districtLogged'],
		data() {
			return{
                id: "",
                title:"",
                description:"",
                user:"",
                fullname:"",
                date:"",
                eventDate:"",
                hour:"",
                location:""
			}
        },
        mounted() {
            this.getDiscussion();
        },
		methods: {
            getDiscussion(){
                axios
                    .put(EVENT_PATH, {
						id: this.$route.params.id
					})
                    .then(response => {
                        console.log("response  "+ response.data.title)
						this.title = response.data[0].title;
                        this.description = response.data[0].description;
                        this.user = response.data[0].user;
                        this.fullname = response.data[0].fullname;
                        this.date = response.data[0].date;
                        this.eventDate = response.data[0].eventDate;
                        this.hour = response.data[0].hour;
                        this.location = response.data[0].location;
                    })
                    .then(err =>{
                        console.log("err:  " + err)
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