<template>
  <div class="add-marker">
		<link rel="stylesheet" href="https://unpkg.com/leaflet@1.5.1/dist/leaflet.css"
	integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
	crossorigin=""/>
		<b-container fluid class ="add-marker-form">
            <b-row order="1">
				<span>Aggiunta punto caldo:</span> <br>
				<form @submit="onAddMarker">
					<input v-model="title" type="text" placeholder="Titolo" required/> <br>
					<input v-model="description" type="text" placeholder="Descrizione" required/> <br>
					<select v-model="tag" required>
						<option disabled value="">Inserisci il tag</option>
						<option>Spazzatura</option>
						<option>Strada dissestata</option>
						<option>Patrimonio culturale o artistico</option>
						<option>Altro</option>
					</select> <br>
                    <input type="file" id="file" @change="previewFiles" multiple> <br>
                    <input id="place" v-model="place" type="text" placeholder="Inserire indirizzo" required/> 
					&nbsp; 
					<b-button id="find-button"  @click="getPosition" pill variant="success"><img src="../assets/find.png"/></b-button> <br>
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
import L from "leaflet";
const axios = require("axios");
const BASE_PATH = "http://127.0.0.1:5051";
const MARKER_PATH = `${BASE_PATH}/point/add`;
export default {
  name: "LeafletMap",
  data() {
    return {
		files: [],
		location: null,
		map: null,
		tileLayer: null,
		marker: null,
		output: "",
		title:"",
		description: "",
		tag: "",
		//image
		place: ""
    };
  },
  mounted() {
    this.initMap();
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    if(!this.location == null){
		this.addMarker();
    }
  },
  methods: {
    initMap() {
      this.map = L.map("map-container",  {
        attributionControl: false,
        dragging: false,
        scrollWheelZoom: 'center',
        doubleClickZoom: 'center',
        touchZoom:       'center'
      });
      const point = this.location ? [this.location.lat, this.location.lng] : [44.1391000, 12.2431500];
      const zoom = this.location ? 15 : 5;
      this.map.setView(point, zoom);
	},
	onAddMarker(event) {
		event.preventDefault();
		let currentObj = this;
		axios
			.post(MARKER_PATH, {
				user: window.sessionStorage.getItem("user"),
				title: this.title,
				description: this.description,
				tag: this.tag,
				// image
				lat: this.location.lat,
				lng: this.location.lng
			})
			.then(response => {
				currentObj.output = response.data;
				this.title = "",
				this.description = "",
				this.tag = "",
				// image
				this.location = ""
			})
			.catch(error => {
				currentObj.output = error.message;
			})
	},
	getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(position => {
		this.location = { 
			lat: position.coords.latitude,
			lng: position.coords.longitude
		};
		//TODO: SCRIVERE POS IN LABEL
		document.getElementById('place').value = `${this.location.lat} ${this.location.lng}`;
      }, function() {
        console.log('Geolocalization failed.');
      }, { 
        enableHighAccuracy: false,
        maximumAge: 1800000
      }
      );
    } else {
      alert("Geolocation not supported by this browser.");
    }
    this.setlocation();
  },
    addMarker() {
      L.marker([this.location.lat, this.location.lng]).addTo(this.map)
        .bindPopup('Sei qui.')
        .openPopup();
	},
	previewFiles() {
		this.files = this.$refs.myFiles.files
    }  
  },
   watch: {
    location: {
      handler() {
        if (this.marker == null) {
          this.addMarker();
        } else {
          this.marker.setLatLng([this.location.lat, this.location.lng]);
        }
        this.map.setView([this.location.lat, this.location.lng], 15);
      },
      deep: true
    }
   }
};
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
    
    #place {
        width: 240px;
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
		input, select {
			width: 270px;
		}
        #place {
            width: 210px;
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

	#find-button {
		width: 50px;
		height: 40px;
		margin-left: 0%;
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
		input, select {
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