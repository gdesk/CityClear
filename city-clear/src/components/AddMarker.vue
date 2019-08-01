<template>
  <div class="add-marker">
		<b-container fluid class ="add-marker-form">
            <b-row order="1">
				<span>Aggiunta punto caldo:</span> <br>
				<form @submit="onRegister">
					<input v-model="title" type="text" placeholder="Titolo" required/> <br>
					<input v-model="description" type="text" placeholder="Descrizione" required/> <br>
					<input v-model="tag" type="text" placeholder="Tag" required/> <br>
                    <input type="file" id="file" @change="previewFiles" multiple> <br>
                    <input id="place" v-model="place" type="text" placeholder="Inserire indirizzo" required/> &nbsp; <img src="../assets/find.png"/> <br>
					<b-button type="submit" pill variant="success"> Aggiungi </b-button>	
				</form>
				<span>
					<br><p>{{output}}</p>
				</span>
			</b-row>
            <b-row order="2">
                <div id=map-container></div>
            </b-row>
		</b-container>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";

    export default {
        data() {
            return {
                files: [],
                map: null
            }
        },
         mounted() {
            this.map = L.map("map-container").setView([44.139, 12.243], 5);
            L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
            attribution:
                '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(this.map);
        },
        beforeDestroy() {
            if (this.map) {
            this.map.remove();
            }
        },
        methods: {
            previewFiles() {
                this.files = this.$refs.myFiles.files
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
    
    #place {
        width: 265px;
    }

    #map-container {
        width: 40vw;
        height: 60vh;
        display: inline-table;
    }  

	@media (max-width: 800px) {
		.row {
			width: 100%;
			align-content: center;
		}
		input {
			width: 270px;
		}
        #place {
            width: 240px;
        }
        #map-container {
            width: 70vw;
            height: 40vh;
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

    img{
            width: 20px;
            height: 20px;
        }

	@media (max-width: 340px) {
		input {
			width: 250px;
		}
        #place {
            width: 230px;
        }
		.btn {
			width: 120px;
		}
		.icon{
			margin-top: 10px;
		}
	}
</style>